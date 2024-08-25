import React, { useState } from 'react';

function DebateApp() {
  const [topic, setTopic] = useState('');
  const [refinedTopic, setRefinedTopic] = useState('');
  const [debateStarted, setDebateStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [debateEnded, setDebateEnded] = useState(false);

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSubmit = () => {
    const refined = `Refined Topic: ${topic.trim()}`;
    setRefinedTopic(refined);
  };

  const startDebate = () => {
    let chatMessages = [];
    for (let i = 1; i <= 10; i++) {
      chatMessages.push(`Person 1: Hi`);
      chatMessages.push(`Person 2: Hi`);
    }
    setMessages(chatMessages);
    setDebateStarted(true);

    // Simulate delay in message exchange
    setTimeout(() => {
      setDebateEnded(true);
    }, 1000 * chatMessages.length);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      {!debateStarted && (
        <>
          <h1 className="text-xl font-bold mb-4">Debate Application</h1>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={topic}
            onChange={handleTopicChange}
            placeholder="Enter a topic for discussion"
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit Topic
          </button>
          {refinedTopic && (
            <>
              <p className="mt-4 text-gray-700">{refinedTopic}</p>
              <button
                className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                onClick={startDebate}
              >
                Start Debate
              </button>
            </>
          )}
        </>
      )}

      {debateStarted && (
        <div className="mt-4">
          {messages.map((msg, index) => (
            <p key={index} className="mb-2 text-gray-700">{msg}</p>
          ))}
          {debateEnded && (
            <p className="mt-4 text-xl font-bold text-green-500">Person 1 has won the debate!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DebateApp;
