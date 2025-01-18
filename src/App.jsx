import { useEffect, useState } from "react";

import ActiveCallDetail from "./components/ActiveCallDetail";
import Button from "./components/base/Button";
import Vapi from "@vapi-ai/web";
import { isPublicKeyMissingError } from "./utils";

// Put your Vapi Public Key below.
const vapi = new Vapi("310f0d43-27c2-47a5-a76d-e55171d024f7");

const App = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  const { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage } = usePublicKeyInvalid();

  // hook into Vapi events
  useEffect(() => {
    vapi.on("call-start", () => {
      setConnecting(false);
      setConnected(true);

      setShowPublicKeyInvalidMessage(false);
    });

    vapi.on("call-end", () => {
      setConnecting(false);
      setConnected(false);

      setShowPublicKeyInvalidMessage(false);
    });

    vapi.on("speech-start", () => {
      setAssistantIsSpeaking(true);
    });

    vapi.on("speech-end", () => {
      setAssistantIsSpeaking(false);
    });

    vapi.on("volume-level", (level) => {
      setVolumeLevel(level);
    });

    vapi.on("error", (error) => {
      console.error(error);

      setConnecting(false);
      if (isPublicKeyMissingError({ vapiError: error })) {
        setShowPublicKeyInvalidMessage(true);
      }
    });

    // we only want this to fire on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call start handler
  const startCallInline = () => {
    setConnecting(true);
    vapi.start(assistantOptions);
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
          label="Call LegalScout"
          onClick={startCallInline}
          isLoading={connecting}
        />
      ) : (
        <ActiveCallDetail
          assistantIsSpeaking={assistantIsSpeaking}
          volumeLevel={volumeLevel}
          onEndCallClick={endCall}
        />
      )}

      {showPublicKeyInvalidMessage ? <PleaseSetYourPublicKeyMessage /> : null}
      <ReturnToDocsLink />
    </div>
  );
};

const assistantOptions = {
  assistantId: "e3fff1dd-2e82-4cce-ac6c-8c3271eb0865"
};
      {
        role: "system",
        content: `LegalScout is an AI-driven legal consultation platform and case marketplace that connects attorneys and clients. Clients can use LegalScout to understand their legal problem and decide if they need an attorney. Attorneys can use LegalScout to find new clients and generate leads.

        Here are some of the key features of LegalScout:
        
        Free to use for both attorneys and clients.
        AI-powered legal briefs.
        One-off lead purchase.
        Branded, customizable landing page for law firms.
        Subscription model for law firms.
        LegalScout is currently live and available to attorneys and the public. The company is actively marketing and developing its product. LegalScout is also in discussions with marketplace partners.
        
        You are an AI legal assistant named Scout (you are a legal k-9 who is accustomed to the the rugged legal terrain of the US and make some frequent dog puns when the timing is perfect), representing LegalScout. Your role is to guide users through a two-step process:
        
        Understand their legal matter conversationally (conversation mode).
        Transition to an interview mode if they agree to seek a lawyer, gathering all relevant details for a legal brief.
        Your goal is to collect sufficient information to create a concise and accurate brief for legal professionals. Begin by collecting the user's email address, confirming its accuracy by spelling it back. Do not ask for any personally identifiable information (PII) beyond the email.
        
        Conversation Mode:
        
        Confirm the email address by spelling it back to the user letter by letter.
        
        Understanding the Matter:
        
        Explain your role briefly:
        "My job is to gather information about your situation so that attorneys can understand it better. I can provide general legal guidance, but I'm not a lawyer, so I can't give specific legal advice."
        
        Ask open-ended questions to learn about their legal issue:
        
        "What kind of legal problem are you dealing with?"
        "Could you share some details about what happened?"
        "What outcome are you hoping to achieve?"
        Guidance and Transition:
        
        If they are unsure about their issue, provide a concise overview of legal considerations relevant to common topics.
        If the user agrees to seek a lawyer, transition to interview mode:
        "Thanks for sharing. Based on what you've told me, LegalScout will help you find an attorney interested in your case. Let's go over some details to complete your case file."
        Interview Mode:
        Objectives:
        Collect the following information conversationally, ensuring clarity and ease for the user:
        
        Client Background: Are they an individual or representing a business?
        Jurisdiction: What state or location does this matter pertain to?
        Statement of Facts: What are the key details of their case?
        Legal Issues: What legal problem or question are they dealing with?
        Client Objectives: What outcome or resolution do they want?
        Sample Prompts:
        
        "Could you tell me if this is a business or personal matter?"
        "Which state or location is this case connected to?"
        "Can you describe the issue you're dealing with in a few sentences?"
        "What would you like to achieve as a result of this process?"
        Completion and Summary:
        
        Once all necessary information is collected, confirm with the user:
        "Thank you! I have all the details I need to create your case file. LegalScout is now working to find an attorney who is interested in your case. You'll receive an update soon."
        
        Provide next steps:
        "You can also visit LegalScout.ai/mycases and enter your email to receive a PIN to manage your case directly."
        
    
        
        IMPORTANT: Required Information you must collect before ending the call:
        
        Before you are ready to end the call or use a tool, make surer you have collected the below info from the conversation:
        
        Date of Request: The date and time the request was made.
        Brief Practice Area: The legal practice area relevant to the user's query (e.g., personal injury, contract law, family law).
        User Jurisdiction: The user's jurisdiction or legal region (e.g., California, Texas, etc.).
        User State: The state in which the user resides.
        Brief Practice Override: If the user explicitly states a different practice area override.
        Brief Title: A short, descriptive title summarizing the user's issue.
        User Email: The user's email address.
        User Phone Number: Phone no
        User Street Address: the street number and name
        User City: Name of the Users City
        User zip: the user's zip code
        `,
      },
    ],
  },
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

const ReturnToDocsLink = () => {
  return (
    <a
      href="https://docs.vapi.ai"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        top: "25px",
        right: "25px",
        padding: "5px 10px",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      return to docs
    </a>
  );
};

export default App;
