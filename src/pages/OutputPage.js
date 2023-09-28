import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../pages-css/OutputPage.css'; // Adjust the import path as per your project structure

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = "INSERT API KEY";

const OutputPage = ({ messages }) => {
  const location = useLocation();
  const { state } = location;

  const [summary, setSummary] = useState({ date: '', content: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSummary = async () => {
      try {
        setLoading(true);
        const userMessages = state.messages.filter((message) => message.role !== 'system');

        const response = await axios.post(
          API_URL,
          {
            model: 'gpt-3.5-turbo',
            messages: [
              ...userMessages,
              {
                role: 'user',
                content: `You are an empathetic, AI-powered assistant, designed to provide support in a medical context. Your user is a patient who has already provided detailed information about their health concerns. Your task is to analyze this information from a medical perspective and provide a summary of the possible condition they might be experiencing, potential causes, and general advice on symptom management.

            For example, if the patient has described symptoms of diarrhea, you might suggest that they could be experiencing food poisoning, which can be caused by consuming contaminated food or water. You could then provide general advice such as staying hydrated and resting.

            Remember, your role is purely informational, and under no circumstances should you attempt to provide medical advice or diagnosis. Always take into account the context provided by the patient and ensure your responses are both medically accurate and understandable to a layperson.

            After providing the summary, remind the patient that this is an AI-generated response and it's crucial for them to consult with a healthcare professional who can provide advice based on a comprehensive understanding of their symptoms and medical history

            Do not show any signs of uncertainty such as "i cannot pinpoint the exact cause". The patient knows you are a bot, and knows that you have limitations. No need to tell them.

            Separate per part
            - Summary of Symptoms
            (explain what measures can they take to alleviaet their problem)
            - Possible Diagnosis
            (talk about the probable disease or condition they have)
            - Potentaial Causes
            (explain the potential cause of their condition)`
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const fetchedSummary = {
          date: new Date().toISOString(),
          content: response.data.choices[0].message.content.trim(),
        };
        setSummary(fetchedSummary);
        setLoading(false);
      } catch (error) {
        console.error('Error response from OpenAI:', error.response?.data);
        setLoading(false);
      }
    };

    if (state && state.messages) getSummary();
  }, [state]);

  return (
    <div className="container">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="outputBox">
          <p className="summaryText">{summary.content}</p>
          {/* Conditionally render the "Done" button */}
          {summary.content && (
            <Link to="/">
              <button className="doneButton">Done</button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
  
};

export default OutputPage;
