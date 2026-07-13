import { useState } from 'react';

export default function ConnectionTest() {
  const [status, setStatus] = useState('Not tested');
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setStatus('Testing...');
    
    try {
      const response = await fetch('http://localhost:5000/api/queue/mm1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meanInterarrivalTime: 10,
          meanServiceTime: 8
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTestResult(data);
      setStatus('✅ Connection successful!');
    } catch (error: any) {
      setTestResult(null);
      setStatus(`❌ Connection failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Backend Connection Test
          </h1>
          
          <div className="space-y-4">
            <button
              onClick={testConnection}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? 'Testing...' : 'Test Connection to C# Backend'}
            </button>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600 mb-2">Status:</p>
              <p className="text-lg font-semibold">{status}</p>
            </div>

            {testResult && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Response from Backend:
                </p>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-blue-800 mb-2">
                ℹ️ Make sure the backend is running!
              </p>
              <p className="text-sm text-blue-700">
                Open a terminal and run:
              </p>
              <code className="block mt-2 p-2 bg-blue-100 rounded text-sm">
                cd Backend && dotnet run
              </code>
              <p className="text-sm text-blue-700 mt-2">
                The backend should be running on: 
                <a 
                  href="http://localhost:5000/swagger" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-1 underline font-medium"
                >
                  http://localhost:5000
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
