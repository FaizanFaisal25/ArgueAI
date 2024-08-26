import { useState, useEffect } from 'react';

export default function DebateForm({ onStartDebate, setForName, setAgainstName, forName, againstName }) {
  const [motion, setMotion] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Check if all fields are filled
    setIsButtonDisabled(!(motion && forName && againstName));
  }, [motion, forName, againstName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onStartDebate({ motion, forName, againstName });
  };

  return (
    <div className="max-w-2xl mx-auto p-16 bg-black text-white text-center rounded">
      <h1 className="text-2xl font-bold mb-8">Start a Debate</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300">Debate Motion</label>
          <textarea
            value={motion}
            onChange={(e) => setMotion(e.target.value)}
            className="w-full p-3 border border-gray-600 bg-gray-800 text-white rounded"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Debater Name (For the Motion)</label>
          <input
            type="text"
            value={forName}
            onChange={(e) => setForName(e.target.value)}
            className="w-full p-3 border border-gray-600 bg-gray-800 text-white rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Debater Name (Against the Motion)</label>
          <input
            type="text"
            value={againstName}
            onChange={(e) => setAgainstName(e.target.value)}
            className="w-full p-3 border border-gray-600 bg-gray-800 text-white rounded"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 bg-white text-black rounded ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
          disabled={isButtonDisabled}
        >
          Start Debate
        </button>
      </form>
    </div>
  );
}
