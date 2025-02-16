// components/Community.js
export default function Community() {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Community</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Forum</h2>
            <p className="text-gray-600">Join the conversation with other Pi Network enthusiasts.</p>
            <button className="mt-4 bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500">
              Visit Forum
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Events</h2>
            <p className="text-gray-600">Stay updated with upcoming Pi Network events and meetups.</p>
            <button className="mt-4 bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500">
              View Calendar
            </button>
          </div>
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Social Media Feed</h2>
          <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-500">
            Twitter/Telegram Feed Placeholder
          </div>
        </div>
      </div>
    );
  }