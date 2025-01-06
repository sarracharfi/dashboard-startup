import React, { useState } from "react";

const startupInfo = {
  label: {
    s2t: "Smart Tunisian Technoparks (S2T) - Centre d'innovation et d'incubation en Tunisie."
  },
  chiffreAffaires: {
    year2023: "En 2023, les startups incubées ont généré un chiffre d'affaires global de X millions de TND.",
    year2024: "Pour 2024, une augmentation prévue de Y% est attendue."
  },
  depenses: {
    annee2023: "Les dépenses totales en 2023 étaient de Z millions de TND.",
    annee2024: "Les dépenses prévues pour 2024 sont en augmentation de W%."
  },
  genre: {
    femme: "En 2023, le pourcentage de femmes impliquées dans les startups incubées était de 40%.",
    homme: "En 2023, le pourcentage d'hommes impliqués dans les startups incubées était de 60%."
  },
  indicateurs: {
    domaineActivite: "Domaines d'activité courants : Technologie, Biotechnologie, Énergies renouvelables.",
    dureeInnovation: "Durée moyenne de l'innovation : 2-3 ans.",
    niveauMaturite: "Niveau de maturité des startups : Débutant à Mûr.",
    partMarche: "Part de marché visée : 5-10% du marché local.",
    financement: "Modèles de financement : Subventions, Investissements en capital-risque, Crowdfunding."
  },
  successStory: "Voici une success story : Startup ABC a réussi à lever 5 millions de TND en série A et a développé une technologie innovante pour l'agriculture durable."
};

const Chat = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const [typingIntervalId, setTypingIntervalId] = useState(null);
  const [typingIndicatorMessage, setTypingIndicatorMessage] =
    useState("Typing");
  const [history, setHistory] = useState([]);

  const displayUserMessage = (message) => {
    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      { message, type: "user" },
    ]);
    setUserInput("");
    updateHistory(message);
  };

  const displayChatbotMessage = (message) => {
    if (isChatbotTyping) {
      clearInterval(typingIntervalId);
      setIsChatbotTyping(false);
    }

    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      { message, type: "chatbot" },
    ]);
    updateHistory(message);
  };

  const displayTypingIndicator = () => {
    if (!isChatbotTyping) {
      setIsChatbotTyping(true);
      clearInterval(typingIntervalId);
      const intervalId = setInterval(() => {
        setTypingIndicatorMessage((prevMessage) => {
          if (prevMessage === "Typing...") {
            return "Typing";
          } else if (prevMessage === "Typing") {
            return "Typing.";
          } else if (prevMessage === "Typing.") {
            return "Typing..";
          } else if (prevMessage === "Typing..") {
            return "Typing...";
          }
        });
      }, 400);
      setTypingIntervalId(intervalId);
    }
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") {
      return;
    }
    displayUserMessage(userInput);

    // Handle local commands like 'salut'
    if (handleCommand(userInput)) {
      return;
    }

    displayTypingIndicator();

    try {
      // Mock response for illustration; replace with actual API call if needed
      displayChatbotMessage("Voici une réponse automatique de votre serveur.");
    } catch (error) {
      console.error("Error:", error);
      displayChatbotMessage(`Désolé, une erreur est survenue... (${error.message})`);
    } finally {
      setIsChatbotTyping(false);
    }
  };

  const handleCommand = (command) => {
    let responseMessage = "";
    switch (command.toLowerCase()) {
      case "salut":
        responseMessage = "Salut! Comment puis-je vous aider aujourd'hui ?";
        break;
      case "info startup":
        responseMessage = startupInfo.label.s2t;
        break;
      case "chiffre d'affaire":
        responseMessage = `${startupInfo.chiffreAffaires.year2023} ${startupInfo.chiffreAffaires.year2024}`;
        break;
      case "depenses":
        responseMessage = `${startupInfo.depenses.annee2023} ${startupInfo.depenses.annee2024}`;
        break;
      case "genre":
        responseMessage = `${startupInfo.genre.femme} ${startupInfo.genre.homme}`;
        break;
      case "indicateurs":
        responseMessage = `${startupInfo.indicateurs.domaineActivite} ${startupInfo.indicateurs.dureeInnovation} ${startupInfo.indicateurs.niveauMaturite} ${startupInfo.indicateurs.partMarche} ${startupInfo.indicateurs.financement}`;
        break;
      case "success story":
        responseMessage = startupInfo.successStory;
        break;
      default:
        return false;
    }
    displayChatbotMessage(responseMessage);
    return true;
  };

  const updateHistory = (message) => {
    setHistory((prevHistory) => [
      ...prevHistory,
      { message, timestamp: new Date().toLocaleTimeString() },
    ]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="chat-container">
      <div className="chat-body-container">
        <div className="chat-body">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type}`}>
              <p>{msg.message}</p>
            </div>
          ))}
          {isChatbotTyping && (
            <div className="typing-indicator">
              {typingIndicatorMessage}
            </div>
          )}
        </div>
        <div className="chat-input-container">
          <input
            className="chat-input"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Tapez votre message..."
          />
          <button className="chat-send-button" onClick={sendMessage}>
            Envoyer
          </button>
        </div>
      </div>
      <div className="history-container">
        <div className="history-header">
          <h5>Historique des messages</h5>
          <button className="history-clear-button" onClick={handleClearHistory}>
            Effacer l'historique
          </button>
        </div>
        {history.length === 0 ? (
          <p>Aucun message dans l'historique.</p>
        ) : (
          history.map((item, index) => (
            <div key={index} className="history-message">
              <p>{item.message}</p>
              <small>{item.timestamp}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Chat;
