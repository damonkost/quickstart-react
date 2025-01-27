import { useEffect, useState } from "react";

import ActiveCallDetail from "./components/ActiveCallDetail";
import Button from "./components/base/Button";
import Vapi from "@vapi-ai/web";
import { isPublicKeyMissingError } from "./utils";

// Put your Vapi Public Key below.
const vapi = new Vapi("310f0d43-27c2-47a5-a76d-e55171d024f7"); // Replace with your actual public key

const App = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [attorneyProfile, setAttorneyProfile] = useState(null);
  const [error, setError] = useState(null);

  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [microphoneAllowed, setMicrophoneAllowed] = useState(false); // Add state for microphone permission

  const { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage } = usePublicKeyInvalid();

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

  useEffect(() => {
    const fetchAttorneyProfile = async () => {
      try {
        const subdomain = window.location.hostname.split('.')[0];
        const response = await fetch(`/api/v1/attorneys?subdomain=${subdomain}`);
        const data = await response.json();
        
        if (data && data.vapiInstructions) {
          setAttorneyProfile(data);
        } else {
          console.warn('No VAPI instructions found for subdomain:', subdomain);
        }
      } catch (error) {
        console.error('Error fetching attorney profile:', error);
        setError('Failed to load attorney configuration');
      }
    };

    fetchAttorneyProfile();
  }, []);

  const startCall = async () => {
    try {
      setConnecting(true);
      
      // Get the base VAPI configuration
      const assistantOverrides = {
        name: attorneyProfile?.firmName || 'LegalScout',
        instructions: attorneyProfile?.vapiInstructions || 'I am a legal assistant',
        maxDuration: 3600
      };

      console.log('Starting VAPI with config:', assistantOverrides);

      // Initialize VAPI with attorney-specific instructions
      vapi.start('e3fff1dd-2e82-4cce-ac6c-8c3271eb0865', assistantOverrides);
      
    } catch (error) {
      console.error("Error starting call:", error);
      setError('Failed to start call');
    } finally {
      setConnecting(false);
    }
  };

  const endCall = () => {
    vapi.stop();
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!connected ? (
        <Button
          label={`Talk to ${attorneyProfile?.firmName || 'LegalScout'}`}
          onClick={startCall}
          isLoading={connecting}
          disabled={!microphoneAllowed} // Disable button if mic access is not allowed
          icon={<LegalScoutIcon />} 
        />
      ) : (
        <ActiveCallDetail
          assistantIsSpeaking={assistantIsSpeaking}
          volumeLevel={volumeLevel}
          onEndCallClick={endCall}
        />
      )}

      {showPublicKeyInvalidMessage ? <PleaseSetYourPublicKeyMessage /> : null}
    </div>
  );
};

// Make sure the image URL is correct and accessible
const LegalScoutIcon = () => (
  <img
    src="https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Fstorage.googleapis.com%2Fglide-prod.appspot.com%2Fuploads-v2%2FZf7Uh2x67Yz3nEftEH2i%2Fpub%2FipEv2VSSLIL0o0e2ostK.png" 
    alt="LegalScout Icon"
    style={{ width: "24px", height: "24px" }}
  />
);

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
