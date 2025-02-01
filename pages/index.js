import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import App from '../src/components/App';
import ActiveCallDetail from "../src/components/ActiveCallDetail.jsx";
import Button from "../src/components/base/Button.jsx";
import Vapi from "@vapi-ai/web";
import { isPublicKeyMissingError } from "../src/utils";
import { getAttorneyConfig } from '../src/config/attorneys';

// Put your Vapi Public Key below.
const vapi = new Vapi("310f0d43-27c2-47a5-a76d-e55171d024f7");

function getSubdomain(hostname) {
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'localhost';
  }
  return hostname.split('.')[0];
}

const Home = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [attorneyProfile, setAttorneyProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [microphoneAllowed, setMicrophoneAllowed] = useState(false);
  const [showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage] = useState(false);

  useEffect(() => {
    const fetchAttorneyProfile = async () => {
      try {
        setIsLoading(true);
        // Use window?.location to handle SSR
        const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
        const subdomain = getSubdomain(hostname);
        
        const response = await fetch(`/api/v1/attorneys?subdomain=${subdomain}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch attorney profile');
        }

        const result = await response.json();
        if (result.status === 'success') {
          setAttorneyProfile(result.data);
          document.title = result.data.firmName;
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching attorney profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttorneyProfile();
  }, []);

  // hook into Vapi events
  useEffect(() => {
    const handleCallStart = () => {
      setConnecting(false);
      setConnected(true);
      setShowPublicKeyInvalidMessage(false);
    };

    const handleCallEnd = () => {
      setConnecting(false);
      setConnected(false);
      setShowPublicKeyInvalidMessage(false);
    };

    const handleSpeechStart = () => {
      setAssistantIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
      setAssistantIsSpeaking(false);
    };

    const handleError = (error) => {
      console.error(error);

      setConnecting(false);
      if (isPublicKeyMissingError({ vapiError: error })) {
        setShowPublicKeyInvalidMessage(true);
      }
    };

    vapi.on('call.start', handleCallStart);
    vapi.on('call.end', handleCallEnd);
    vapi.on('speech.start', handleSpeechStart);
    vapi.on('speech.end', handleSpeechEnd);
    vapi.on('error', handleError);

    return () => {
      vapi.off('call.start', handleCallStart);
      vapi.off('call.end', handleCallEnd);
      vapi.off('speech.start', handleSpeechStart);
      vapi.off('speech.end', handleSpeechEnd);
      vapi.off('error', handleError);
    };
  }, []);

  const handleStartClick = async () => {
    try {
      setConnecting(true);
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicrophoneAllowed(true);
      const assistantOverrides = {
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        recordingEnabled: true,
        instructions: attorneyProfile?.vapiInstructions || 'I am a legal assistant'
      };
      await vapi.start(attorneyProfile?.vapiContext || 'e3fff1dd-2e82-4cce-ac6c-8c3271eb0865', assistantOverrides);
    } catch (err) {
      setConnecting(false);
      console.error('Error starting call:', err);
      if (isPublicKeyMissingError(err)) {
        setShowPublicKeyInvalidMessage(true);
      }
    }
  };

  const handleStopClick = () => {
    vapi.stop();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <App attorneyProfile={attorneyProfile}>
      <div>
        <Button
          label={connected ? "End Call" : connecting ? "Connecting..." : "Start Call"}
          onClick={connected ? handleStopClick : handleStartClick}
          isLoading={connecting}
          disabled={connecting}
        />
        {connected && <ActiveCallDetail assistantIsSpeaking={assistantIsSpeaking} volumeLevel={volumeLevel} />}
        {showPublicKeyInvalidMessage && (
          <div
            style={{
              position: "fixed",
              bottom: "25px",
              left: "25px",
              padding: "10px",
              color: "#fff",
              backgroundColor: "#f03e3e",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            Is your Vapi Public Key missing? (recheck your code)
          </div>
        )}
      </div>
    </App>
  );
};

export default Home;
