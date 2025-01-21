import React from "react";

const AssistantSpeechIndicator = ({ isSpeaking }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", visibility: isSpeaking ? "visible" : "hidden"}}> 
      <p style={{ color: "white", margin: 0 }}>
        {isSpeaking ? "Barking" : "Listening"} 
      </p>
    </div>
  );
};

export default AssistantSpeechIndicator;
