import { useEffect, useState } from 'react';
import api from '../utils/api';
import AddMetricForm from '../components/AddMetricForm';
import LoadingSpinner from '../components/LoadingSpinner';

interface HealthMetric {
    id: number;
    type: 'HEART_RATE' | 'STEPS' | 'SLEEP' | 'WEIGHT';
    value: number;
    unit: string;
    measuredAt: string;
}

const Dashboard = () => {
    const [metrics, setMetrics] = useState<HealthMetric[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMetrics = async () => {
        try {
            const response = await api.get('/health');
            // Sort by date desc
            const sorted = response.data.sort((a: HealthMetric, b: HealthMetric) =>
                new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime()
            );
            setMetrics(sorted);
        } catch (error) {
            console.error('Error fetching metrics:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMetrics();
    }, []);

    const getLatestMetric = (type: string) => {
        const typeMetrics = metrics.filter(m => m.type === type);
        if (typeMetrics.length === 0) return null;
        return typeMetrics[0]; // Already sorted
    };

    const heartRate = getLatestMetric('HEART_RATE');
    const steps = getLatestMetric('STEPS');
    const sleep = getLatestMetric('SLEEP');

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full min-h-[400px]">
                <div className="text-center">
                    <LoadingSpinner />
                    <p className="mt-4 text-gray-500">Syncing your health data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-gray-500 text-sm font-medium">Heart Rate</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">
                                {heartRate ? heartRate.value : '--'} <span className="text-base font-normal text-gray-500">BPM</span>
                            </p>
                        </div>
                        <div className="p-2 bg-red-50 rounded-lg">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                    </div>
                    <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(((heartRate?.value || 0) / 200) * 100, 100)}%` }}></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-gray-500 text-sm font-medium">Daily Steps</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">
                                {steps ? steps.value : '--'}
                            </p>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                    </div>
                    <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(((steps?.value || 0) / 10000) * 100, 100)}%` }}></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-gray-500 text-sm font-medium">Sleep</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">
                                {sleep ? `${sleep.value}h` : '--'}
                            </p>
                        </div>
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                        </div>
                    </div>
                    <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(((sleep?.value || 0) / 10) * 100, 100)}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Add Metric Section */}
            <AddMetricForm onMetricAdded={fetchMetrics} />

            {/* Recent Activity Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {metrics.length > 0 ? (
                                metrics.map((metric) => (
                                    <tr key={metric.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                ${metric.type === 'HEART_RATE' ? 'bg-red-100 text-red-800' :
                                                    metric.type === 'STEPS' ? 'bg-blue-100 text-blue-800' :
                                                        metric.type === 'SLEEP' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {metric.type.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                            {metric.value} <span className="text-gray-500 font-normal">{metric.unit}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(metric.measuredAt).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="flex items-center text-sm text-green-600">
                                                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                                Synced
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        No activity logged yet. Start by adding a metric above!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
