import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../pages-css/ChatPage.css';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = "INSERT API KEY";


function ChatPage({ location }) {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const { state = {} } = location || {};
  const { symptoms, duration, patterns, medications } = state;

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const goToOutputPage = () => {
    navigate('/outputpage', { state: { messages } }); // navigate to OutputPage with messages as state
  };  

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    setLoading(true);

    const userMessage = { role: 'user', content: userInput };
    const systemMessage = {
      role: 'assistant',
      content: `Symptoms: ${symptoms}. Duration of symptoms: ${duration} Patterns of symptoms: ${patterns} Symptoms: ${medications}}
      This is the context about the patient
      You are a highly empathetic, AI-powered assistant, providing support in a medical context.
      Your user is a patient who has answered the following questions about their health concerns:
      Your task is not to diagnose or analyze the patient's condition. Instead, you are to use the information provided to ask follow-up questions,
      aimed at gathering more details and understanding the patient's situation better. Probe into different areas of their lifestyle, such as diet,
      exercise, stress levels, and sleep patterns, which might be relevant to their symptoms. It's important to remain respectful, empathetic,
      and understanding in your tone throughout the conversation, making the patient feel heard and acknowledged.
      After a thorough conversation, when you think you have gathered enough information, you should inform the patient that
      you've completed your questions and the data will be reviewed by medical professionals for further analysis.
      Remember, your role is purely informational, and under no circumstances should you attempt to provide medical advice or diagnosis.
      Take into account the context provided by the patient
      ASK ONE QUESTION AT A TIME. DO NOT OVERWHELM THE PATIENT`,
    };

    try {
      const response = await axios.post(API_URL, {
        model: 'gpt-3.5-turbo',
        messages: [...messages, systemMessage, userMessage],
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const botMessage = { role: 'system', content: response.data.choices[0].message.content.trim() };
      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error response from OpenAI:", error.response?.data);
    }

    setUserInput('');
    setLoading(false);
  };

  return (
    <div className="main-container-chatpage">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={message.role === 'user' ? 'user-message' : 'bot-message'}
          >
            <span>{message.content}</span>
          </div>
        ))}
      </div>
      
        <div className="input-container-chat">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type a message..."
            disabled={loading}
            className="user-input"
          />
          <button 
            onClick={sendMessage} 
            disabled={loading || !userInput.trim()}
            className={loading || !userInput.trim() ? 'send-button-disabled' : 'send-button'}
          >
            {loading ? '➤' : '➤'}
          </button>
        </div>
       

      <button onClick={goToOutputPage} className="submit-button">
          Generate
        </button>
    </div>
  );
  
}

export default ChatPage;