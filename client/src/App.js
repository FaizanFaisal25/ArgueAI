import { useState } from 'react';
import DebateForm from './DebateForm';

function App() {
  const [debateStarted, setDebateStarted] = useState(false);
  const [debateData, setDebateData] = useState(null);

  const startDebate = async (data) => {
    setDebateStarted(true);
    setDebateData(data);

    // Make a request to your Flask server to start the debate
    try {
      const response = await fetch('http://localhost:5000/start-debate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result); // Handle the result or update state accordingly
    } catch (error) {
      console.error('Error starting the debate:', error);
    }
  };

  return (
    <div className="App">
      {!debateStarted ? (
        <DebateForm onStartDebate={startDebate} />
      ) : (
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Debate in Progress...</h1>
          {/* Display debate progress or messages here */}
        </div>
      )}
    </div>
  );
}

export default App;
