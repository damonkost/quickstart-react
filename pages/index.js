  import React, { useEffect, useState } from 'react';
import ActiveCallDetail from "../src/components/ActiveCallDetail.jsx";
import Button from "../src/components/base/Button.jsx";
import Vapi from "@vapi-ai/web";
import { isPublicKeyMissingError } from "../src/utils";
import { getAttorneyConfig } from '../src/config/attorneys';
import Head from 'next/head';

// Put your Vapi Public Key below.
const vapi = new Vapi("310f0d43-27c2-47a5-a76d-e55171d024f7");

const App = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [attorneyProfile, setAttorneyProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [microphoneAllowed, setMicrophoneAllowed] = useState(false); // Add state for microphone permission

  const { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage } = usePublicKeyInvalid();

  useEffect(() => {
    const fetchAttorneyProfile = async () => {
      try {
        setIsLoading(true);
        const subdomain = window.location.hostname.split('.')[0];
        const response = await fetch(`/api/v1/attorneys?subdomain=${subdomain}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch attorney profile');
        }

        const result = await response.json();
        if (result.status === 'success') {
          setAttorneyProfile(result.data);  
          document.title = result.data.firmName; // Set the document title dynamically
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        setError(err.message);
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

    const handleVolumeLevel = (level) => {
      setVolumeLevel(level);
    };

    const handleError = (error) => {
      console.error(error);

      setConnecting(false);
      if (isPublicKeyMissingError({ vapiError: error })) {
        setShowPublicKeyInvalidMessage(true);
      }
    };

    // Add event listeners
    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("volume-level", handleVolumeLevel);
    vapi.on("error", handleError);

    // Clean up event listeners on unmount
    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("volume-level", handleVolumeLevel);
      vapi.off("error", handleError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  // Set a fallback title
  const title = attorneyProfile ? attorneyProfile.firmName : 'LegalScout';

  return (
    <div style={{
      display: "flex",
      width: "100vw",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: "2rem"
    }}>
      <Head>
        <title>{title}</title>
      </Head>
      {!connected ? (
        <>
          {attorneyProfile?.logo && (
            <img 
              src={attorneyProfile.logo} 
              alt={`${attorneyProfile.firmName} Logo`}
              style={{
                maxWidth: "200px",
                height: "auto",
                marginBottom: "1rem"
              }}
              onError={(e) => {
                console.log('Logo failed to load');
                e.target.style.display = 'none';
              }}
            />
          )}
          <Button
            onClick={async () => {
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
                vapi.start(attorneyProfile?.vapiContext || 'e3fff1dd-2e82-4cce-ac6c-8c3271eb0865', assistantOverrides);
              } catch (error) {
                console.error("Error:", error);
                setError('Failed to start call');
                setConnecting(false);
              }
            }}
            disabled={connecting}
            isLoading={connecting}
            label={connecting ? 'Connecting...' : `Talk to ${attorneyProfile?.firmName}`}
            logo={attorneyProfile?.logo}
          />
        </>
      ) : (
        <ActiveCallDetail
          assistantIsSpeaking={assistantIsSpeaking}
          volumeLevel={volumeLevel}
          onEndCallClick={() => vapi.stop()}
        />
      )}

      {showPublicKeyInvalidMessage ? <PleaseSetYourPublicKeyMessage /> : null}
    </div>
  );
};

const usePublicKeyInvalid = () => {
  const [showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage] = useState(false);

  // close public key invalid message after delay
  useEffect(() => {
    if (showPublicKeyInvalidMessage) {
      setTimeout(() => {
        setShowPublicKeyInvalidMessage(false);
      }, 3000);
    }
  }, [showPublicKeyInvalidMessage]);

  return {
    showPublicKeyInvalidMessage,
    setShowPublicKeyInvalidMessage,
  };
};

const PleaseSetYourPublicKeyMessage = () => {
  return (
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
  );
};

export default App;
