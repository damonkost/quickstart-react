import { useEffect, useState, useRef } from "react";
import { Stage, Layer, Line } from 'react-konva'; 

import ActiveCallDetail from "./components/ActiveCallDetail";
import Button from "./components/base/Button";
import Vapi from "@vapi-ai/web";
import { isPublicKeyMissingError } from "./utils";

// Put your Vapi Public Key below.
const vapi = new Vapi("YOUR_VAPI_PUBLIC_KEY_HERE"); // Replace with your actual public key

const App = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [microphoneAllowed, setMicrophoneAllowed] = useState(false);

  const { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage } = usePublicKeyInvalid();

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

      vapi.start('e3fff1dd-2e82-4cce-ac6c-8c3271eb0865', assistantOverrides);
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
      {!connected ? (
        <Button
          label="Call Scout"
          onClick={startCallInline}
          isLoading={connecting}
          disabled={!microphoneAllowed}
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

const LegalScoutIcon = () => (
  <img
    src="https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Fstorage.googleapis.com%2Fglide-prod.appspot.com%2Fuploads-v2%2FZf7Uh2x67Yz3nEftEH2i%2Fpub%2FipEv2VSSLIL0o0e2ostK.png"
    alt="LegalScout Icon"
    style={{ width: "24px", height: "24px" }}
  />
);

const usePublicKeyInvalid = () => {
  const [showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage] = useState(false);

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

const ActiveCallDetail = ({ assistantIsSpeaking, volumeLevel, onEndCallClick }) => {
  const stageRef = useRef(null);
  const lineRef = useRef(null);
  const points = useRef([]);

  useEffect(() => {
    const stage = stageRef.current;
    const line = lineRef.current;
    const animationId = requestAnimationFrame(animate);

    function animate() {
      const newPoint = {
        x: (points.current.length % stage.width()) + 1,
        y: (1 - volumeLevel) * stage.height() / 2,
      };
      points.current = [...points.current, newPoint];

      if (points.current.length > stage.width()) {
        points.current.shift();
      }

      line.points(points.current.flatMap(p => [p.x, p.y]));
      requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [volumeLevel]);

  return (
    <div>
      <Stage width={300} height={100} ref={stageRef}>
        <Layer>
          <Line
            ref={lineRef}
            stroke="lightblue"
            strokeWidth={2}
            lineCap="round"
            lineJoin="round"
          />
        </Layer>
      </Stage>

      <button onClick={onEndCallClick}>End Call</button>
    </div>
  );
};


export default App;
