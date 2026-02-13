import React, { useState } from 'react';
import api from '../utils/api';

interface AddMetricFormProps {
    onMetricAdded: () => void;
}

const AddMetricForm: React.FC<AddMetricFormProps> = ({ onMetricAdded }) => {
    const [type, setType] = useState('HEART_RATE');
    const [value, setValue] = useState('');
    const [unit, setUnit] = useState('BPM');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/health', {
                type,
                value: parseFloat(value),
                unit,
                measuredAt: new Date().toISOString()
            });
            setValue('');
            onMetricAdded();
        } catch (error) {
            console.error('Error adding metric:', error);
            alert('Failed to add metric');
        } finally {
            setLoading(false);
        }
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        setType(newType);
        switch (newType) {
            case 'HEART_RATE': setUnit('BPM'); break;
            case 'STEPS': setUnit('steps'); break;
            case 'SLEEP': setUnit('hours'); break;
            case 'WEIGHT': setUnit('kg'); break;
            default: setUnit('');
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Log Activity</h3>
            <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Metric Type</label>
                    <select
                        value={type}
                        onChange={handleTypeChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    >
                        <option value="HEART_RATE">Heart Rate</option>
                        <option value="STEPS">Steps</option>
                        <option value="SLEEP">Sleep</option>
                        <option value="WEIGHT">Weight</option>
                    </select>
                </div>

                <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="e.g. 72"
                        required
                        step="0.01"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                </div>

                <div className="flex-1 min-w-[100px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                    <input
                        type="text"
                        value={unit}
                        readOnly
                        className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 h-[42px]"
                >
                    {loading ? 'Adding...' : 'Add Log'}
                </button>
            </form>
        </div>
    );
};

export default AddMetricForm;
