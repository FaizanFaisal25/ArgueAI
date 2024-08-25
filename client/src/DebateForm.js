import { useState } from 'react';

export default function DebateForm({ onStartDebate }) {
  const [motion, setMotion] = useState('');
  const [forName, setForName] = useState('');
  const [againstName, setAgainstName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onStartDebate({ motion, forName, againstName });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Start a Debate</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Debate Motion</label>
          <textarea
            value={motion}
            onChange={(e) => setMotion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Debater Name (For the Motion)</label>
          <input
            type="text"
            value={forName}
            onChange={(e) => setForName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Debater Name (Against the Motion)</label>
          <input
            type="text"
            value={againstName}
            onChange={(e) => setAgainstName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start Debate
        </button>
      </form>
    </div>
  );
}
