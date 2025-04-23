import { useState } from 'react';

export default function Home() {
  const [session, setSession] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeploy = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:3001/deploy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session }),
    });
    setLoading(false);
    alert(await res.json().then((d) => d.message));
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-black bg-opacity-60 border border-purple-500 rounded-xl">
      <h1 className="text-3xl font-bold text-purple-400 mb-6 text-center">Mr Tech Ke Bot Host</h1>
      <textarea
        className="w-full p-4 bg-gray-900 text-purple-300 border border-purple-500 rounded mb-4"
        placeholder="Paste Base64 Session ID here..."
        rows={6}
        value={session}
        onChange={(e) => setSession(e.target.value)}
      />
      <button
        className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded font-semibold"
        onClick={handleDeploy}
        disabled={loading}
      >
        {loading ? 'Deploying...' : 'Deploy Bot'}
      </button>
    </div>
  );
}
