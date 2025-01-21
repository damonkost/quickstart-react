import { useEffect, useState } from "react";

import ActiveCallDetail from "./components/ActiveCallDetail";
import Button from "./components/base/Button";
import Vapi from "@vapi-ai/web";
import { isPublicKeyMissingError } from "./utils";

// Put your Vapi Public Key below.
const vapi = new Vapi("YOUR_VAPI_PUBLIC_KEY"); // Replace with your actual public key

const App = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [microphoneAllowed, setMicrophoneAllowed] = useState(false);

  const { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage } =
    usePublicKeyInvalid();

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

    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("volume-level", handleVolumeLevel);
    vapi.on("error", handleError);

    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("volume-level", handleVolumeLevel);
      vapi.off("error", handleError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },);

  const startCallInline = async () => {
    setConnecting(true);

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicrophoneAllowed(true);

      const assistantOverrides = {
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        recordingEnabled: true,
      };

      vapi.start("e3fff1dd-2e82-4cce-ac6c-8c3271eb0865", assistantOverrides);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setConnecting(false);
    }
  };

  const endCall = () => {
    vapi.stop();
  };

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
      {connected ? ( // Show call-related components only when connected
        <div> 
          <ActiveCallDetail
            assistantIsSpeaking={assistantIsSpeaking}
            volumeLevel={volumeLevel}
            onEndCallClick={endCall}
          />
        </div>
      ) : (
        <div> {/* Show other content only when not connected */}
          <header>
            <nav>
              <div className="logo-container">
                <img
                  className="logo"
                  src="https://res.cloudinary.com/glide/image/fetch/f_auto,c_limit/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fglide-prod.appspot.com%2Fo%2Ficon-images%252Fanonymous-4ec86c98-f143-4160-851d-892f167b223c.png%3Falt%3Dmedia%26token%3Dcdc26513-26ae-48f6-b085-85b8bb806c4c"
                  alt="LegalScout Logo"
                />
              </div>
              <div className="nav-links">
                <a href="https://legalscout.ai/dl/Home">Home</a>
                <a href="https://legalscout.ai/dl/Cases">My Cases</a>
                <a href="https://legalscout.ai/dl/About">About</a>
              </div>
            </nav>
          </header>

          <main className="hero">
            <div className="statement">
              <p>
                <span>Use our free AI to be matched</span>
                <span>with an ideal human lawyer,</span>
                <span>knowledgeable about your case and eager to help.</span>
              </p>
              <Button
                label="Call Scout"
                onClick={startCallInline}
                isLoading={connecting}
                disabled={!microphoneAllowed}
                icon={<LegalScoutIcon />}
              />
            </div>
          </main>

          {showPublicKeyInvalidMessage ? (
            <PleaseSetYourPublicKeyMessage />
          ) : null}
        </div>
      )}
    </div>
  );
};

// ... rest of your App.jsx code (LegalScoutIcon, usePublicKeyInvalid, PleaseSetYourPublicKeyMessage) ...

export default App;
