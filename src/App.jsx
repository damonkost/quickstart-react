// App.jsx

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

  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [microphoneAllowed, setMicrophoneAllowed] = useState(false); // Add state for microphone permission

  const { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage } = usePublicKeyInvalid();

  // hook into Vapi events
  useEffect(() => {
    // ... (your event handler functions) ...

    // Add event listeners
    // ... (your event listener code) ...

    // Clean up event listeners on unmount
    // ... (your cleanup code) ...

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call start handler
  const startCallInline = async () => { 
    // ... (your call start logic) ...
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
        <div className="statement"> {/* Wrap the statement and button */}
          <p>
            Use our free AI to be matched with an ideal human lawyer,
            knowledgeable about your case and eager to help.
          </p>
          <Button
            label="Call Scout"
            onClick={startCallInline}
            isLoading={connecting}
            disabled={!microphoneAllowed} // Disable button if mic access is not allowed
            icon={<LegalScoutIcon />} 
          />
          <ActiveCallDetail  {/* Place ActiveCallDetail below the button */}
            assistantIsSpeaking={assistantIsSpeaking}
            volumeLevel={volumeLevel}
            onEndCallClick={endCall}
          />
        </div> 
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

// ... (your LegalScoutIcon, usePublicKeyInvalid, and PleaseSetYourPublicKeyMessage components) ...

export default App;
