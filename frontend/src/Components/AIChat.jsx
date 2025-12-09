import { useState } from "react";
import { askAI } from "../services/aiService";
import "../static/ai.css";

const AIChat = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // [{role, content}]
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState("waiter");

  // Helper to convert chatHistory to LangChain message format
  const toLangChainHistory = (history) =>
    history.map((msg) => ({
      type: msg.role === "user" ? "human" : "ai",
      data: { content: msg.content },
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);

    // Add user's message to chatHistory
    const newHistory = [...chatHistory, { role: "user", content: question }];
    setChatHistory(newHistory);

    try {
      // Send question, chat history, and persona to backend
      const data = await askAI({
        question,
        chat_history: toLangChainHistory(newHistory),
        persona,
      });
      // Add AI response to chatHistory
      setChatHistory([
        ...newHistory,
        { role: "ai", content: data.response || JSON.stringify(data) },
      ]);
      setQuestion("");
    } catch (err) {
      console.error("Erreur IA :", err);
      setChatHistory([
        ...newHistory,
        { role: "ai", content: "Erreur lors de la communication avec l'IA." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="ai-chat-container">
      <div className="ai-chat-box">
        <h2 className="ai-title">🤖 Parle avec ton Assistant IA</h2>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="persona-select"><b>Persona:&nbsp;</b></label>
          <select
            id="persona-select"
            value={persona}
            onChange={e => setPersona(e.target.value)}
            disabled={loading}
          >
            <option value="waiter">Serveur / Waiter</option>
            <option value="chef">Chef</option>
            <option value="sommelier">Sommelier</option>
          </select>
        </div>
        <div className="ai-history">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`ai-msg ai-msg-${msg.role}`}>
              <b>{msg.role === "user" ? "Vous" : "IA"}:</b> {msg.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="ai-form">
          <input
            type="text"
            className="ai-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Pose ta question ici..."
            disabled={loading}
            autoFocus
          />
          <button type="submit" className="ai-button" disabled={loading}>
            {loading ? <span className="ai-loader"></span> : "Envoyer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
