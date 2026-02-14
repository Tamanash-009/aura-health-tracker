import { useEffect, useState } from 'react';
import api from '../utils/api';

interface UserProfile {
    id: number;
    username: string;
    email: string;
}

const UserProfile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/users/me');
                setProfile(response.data);
                setNewUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async () => {
        try {
            const response = await api.put('/users/me', { username: newUsername });
            setProfile(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-indigo-600 h-32 relative">
                    <div className="absolute -bottom-12 left-8">
                        <div className="w-24 h-24 rounded-full bg-white p-1">
                            <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600">
                                {profile?.username.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-16 pb-8 px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            {isEditing ? (
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        className="input-field py-1 px-3 text-lg font-bold"
                                    />
                                    <button onClick={handleSave} className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">Save</button>
                                    <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400">Cancel</button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <h1 className="text-2xl font-bold text-gray-900">{profile?.username}</h1>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                                        title="Edit Username"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                    </button>
                                </div>
                            )}
                            <p className="text-gray-500">{profile?.email}</p>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-100 pt-8">
                        <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">Email Notifications</p>
                                    <p className="text-sm text-gray-500">Receive weekly health summaries</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                </label>
                            </div>
                            {/* More settings placeholders */}
                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg opacity-50 cursor-not-allowed">
                                <div>
                                    <p className="font-medium text-gray-900">Unit Preferences</p>
                                    <p className="text-sm text-gray-500">Metric (kg, cm) / Imperial (lbs, ft)</p>
                                </div>
                                <span className="text-xs bg-gray-200 px-2 py-1 rounded">Coming Soon</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
