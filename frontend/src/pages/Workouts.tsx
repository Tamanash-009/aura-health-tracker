import { useState } from 'react';

const Workouts = () => {
    const [filter, setFilter] = useState('ALL');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Workouts</h1>
                <button className="btn-primary">
                    + Log Workout
                </button>
            </div>

            {/* Filters */}
            <div className="flex space-x-2 border-b border-gray-200 pb-1">
                {['ALL', 'CARDIO', 'STRENGTH', 'FLEXIBILITY'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${filter === type
                                ? 'bg-primary/10 text-primary border-b-2 border-primary'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {type.charAt(0) + type.slice(1).toLowerCase()}
                    </button>
                ))}
            </div>

            {/* Content Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No workouts logged yet</h3>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                    Start tracking your exercises to see your progress over time.
                </p>
                <button className="mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Log your first workout
                </button>
            </div>
        </div>
    );
};

export default Workouts;
