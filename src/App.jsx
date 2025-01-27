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
  const [microphoneAllowed, setMicrophoneAllowed] = useState(false);

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
        console.log('Current subdomain:', subdomain);

        // Update to use HTTPS and full domain
        const response = await fetch(`https://legalscout.net/api/v1/attorneys?subdomain=${subdomain}`);
        const data = await response.json();
        
        console.log('Raw API response:', data);
        console.log('Attorney profile data:', data.data);

        if (data && data.data) {
          setAttorneyProfile(data.data);
          console.log('Set attorney profile to:', data.data);
        } else {
          console.warn('No attorney data found for subdomain:', subdomain);
          setAttorneyProfile({
            firmName: 'LegalScout',
            logo: "https://res.cloudinary.com/glide/image/fetch/f_auto,c_limit/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fglide-prod.appspot.com%2Fo%2Ficon-images%252Fanonymous-4ec86c98-f143-4160-851d-892f167b223c.png%3Falt%3Dmedia%26token%3Dcdc26513-26ae-48f6-b085-85b8bb806c4c"
          });
        }
      } catch (error) {
        console.error('Error fetching attorney profile:', error);
        setError('Failed to load attorney configuration');
      }
    };

    fetchAttorneyProfile();
  }, []);

  console.log('Current attorney profile state:', attorneyProfile); // Debug log

  const startCall = async () => {
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

      vapi.start('e3fff1dd-2e82-4cce-ac6c-8c3271eb0865', assistantOverrides);
    } catch (error) {
      console.error("Error:", error);
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
        flexDirection: 'column' // Added to stack elements vertically
      }}
    >
      {!connected ? (
        <>
          {attorneyProfile?.firmName && !error && (
            <h1>{attorneyProfile.firmName}</h1>
          )}
          
          {attorneyProfile?.logo && (
            <img 
              src={attorneyProfile.logo} 
              alt={`${attorneyProfile.firmName || 'LegalScout'} logo`}
              onError={(e) => {
                console.log('Logo failed to load');
                e.target.style.display = 'none';
              }}
            />
          )}

          <div className="button-container">
            <Button
              onClick={startCall}
              disabled={connecting}
              label={connecting ? 'Connecting...' : `Talk to ${attorneyProfile?.firmName || 'LegalScout'}`}
              logo={attorneyProfile?.logo || "https://res.cloudinary.com/glide/image/fetch/f_auto,c_limit/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fglide-prod.appspot.com%2Fo%2Ficon-images%252Fanonymous-4ec86c98-f143-4160-851d-892f167b223c.png%3Falt%3Dmedia%26token%3Dcdc26513-26ae-48f6-b085-85b8bb806c4c"}
            />
          </div>
        </>
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
