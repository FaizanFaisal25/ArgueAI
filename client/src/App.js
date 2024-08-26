import { useState } from 'react';
import DebateForm from './DebateForm';

function App() {
  const [debateStarted, setDebateStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [forName, setForName] = useState('');
  const [againstName, setAgainstName] = useState('');

  const startDebate = async (data) => {
    setDebateStarted(true);
    setMessages([]);

    try {
      // Initialize agents
      const response = await fetch('http://localhost:9988/initialize_agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result); // Handle the result or update state accordingly

      // Start the debate by sending the first message
      await sendMessage(0, "Make your opening statement in favour of the motion.");
    } catch (error) {
      console.error('Error starting the debate:', error);
    }
  };

  const sendMessage = async (agentIndex, message) => {
    try {
      const response = await fetch('http://localhost:9988/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agent_index: agentIndex, message }),
      });
  
      if (response.status === 400) {
        console.log('Received status 400, stopping recursion.');
        return;
      }
  
      const result = await response.json();
      console.log(result);
  
      // Update messages and switch to the next agent
      setMessages((prevMessages) => [
        ...prevMessages,
        { agentIndex: agentIndex, message: result.response },
      ]);
  
      await sendMessage(1 - agentIndex, result.response); // Sending response from Agent 0 to Agent 1
  
    } catch (error) {
      console.error('Error sending message:', error);
      return 0;
    }
  };

  return (
    <div className="App">
      {!debateStarted ? (
        <DebateForm
          onStartDebate={startDebate}
          setForName={setForName}
          setAgainstName={setAgainstName}
          forName={forName}
          againstName={againstName}
        />
      ) : (
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Debate in Progress...</h1>
          <div className="messages space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 p-4 rounded-lg ${
                  msg.agentIndex === 0
                    ? 'bg-blue-100 text-blue-900 self-start'
                    : 'bg-green-100 text-green-900 self-end'
                }`}
              >
                {/* Avatar/Icon */}
                <div className="shrink-0">
                  {msg.agentIndex === 0 ? (
                    <span role="img" aria-label="For">
                      💬
                    </span>
                  ) : (
                    <span role="img" aria-label="Against">
                      🗨️
                    </span>
                  )}
                </div>
                {/* Message Content */}
                <div>
                  <div className="text-sm font-semibold">
                    {msg.agentIndex === 0 ? forName : againstName}
                  </div>
                  <p className="mt-1">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
