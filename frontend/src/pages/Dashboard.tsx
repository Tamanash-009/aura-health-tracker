const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Metric Widget Placeholders */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-gray-500 text-sm font-medium">Heart Rate</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">72 <span className="text-base font-normal text-gray-500">BPM</span></p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-gray-500 text-sm font-medium">Daily Steps</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">8,432</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-gray-500 text-sm font-medium">Sleep</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">7h 12m</p>
            </div>
        </div>
    );
};

export default Dashboard;
