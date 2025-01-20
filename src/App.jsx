import { useEffect, useState } from "react";

import ActiveCallDetail from "./components/call/ActiveCallDetail";
import Button from "./components/base/Button";
import Vapi from "@vapi-ai/web";
import { isPublicKeyMissingError } from "./utils";

const vapi = new Vapi("YOUR_VAPI_PUBLIC_KEY");

function App() {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [microphoneAllowed, setMicrophoneAllowed] = useState(false);

  const {
    showPublicKeyInvalidMessage,
    setShowPublicKeyInvalidMessage,
  } = usePublicKeyInvalid();

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

    const handleSpeechStart = () =>
      setAssistantIsSpeaking(true);

    const handleSpeechEnd = () =>
      setAssistantIsSpeaking(false);

    const handleVolumeLevel = level => setVolumeLevel(level);

    const handleError = error => {
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
  }, []);

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
      vapi.start(
        "e3fff1dd-2e82-4cce-ac6c-8c3271eb0865",
        assistantOverrides
      );
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setConnecting(false);
    }
  };

  const endCall = () => vapi.stop();

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
          label="Call Scout"
          onClick={startCallInline}
          isLoading={connecting}
          disabled={!microphoneAllowed}
        />
      ) : (
        <ActiveCallDetail
          assistantIsSpeaking={assistantIsSpeaking}
          volumeLevel={volumeLevel}
          onEndCallClick={endCall}
        />
      )}
      {showPublicKeyInvalidMessage ? (
        <PleaseSetYourPublicKeyMessage />
      ) : null}
    </div>
  );
}

const usePublicKeyInvalid = () => {
  const [showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage] =
    useState(false);

  useEffect(() => {
    if (showPublicKeyInvalidMessage) {
      setTimeout(() => setShowPublicKeyInvalidMessage(false), 3000);
    }
  }, [showPublicKeyInvalidMessage]);

  return {
    showPublicKeyInvalidMessage,
    setShowPublicKeyInvalidMessage,
  };
};

const PleaseSetYourPublicKeyMessage = () => (
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

export default App;
