import { Outlet, Link, useLocation } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';

const Layout = () => {
    const location = useLocation();
    const { signOut } = useClerk();

    const isActive = (path: string) => {
        return location.pathname === path ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50';
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-indigo-600">Vitalis</h1>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    <Link to="/" className={`block py-2 px-4 rounded-md ${isActive('/')}`}>Dashboard</Link>
                    <Link to="/workouts" className={`block py-2 px-4 rounded-md ${isActive('/workouts')}`}>Workouts</Link>
                    <Link to="/profile" className={`block py-2 px-4 rounded-md ${isActive('/profile')}`}>Profile</Link>
                </nav>
                <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
                    <button
                        onClick={() => signOut()}
                        className="w-full py-2 px-4 text-left text-red-600 hover:bg-red-50 rounded-md flex items-center"
                    >
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {location.pathname === '/' ? 'Dashboard' :
                            location.pathname === '/workouts' ? 'Workout Log' :
                                location.pathname === '/profile' ? 'My Profile' : 'Vitalis'}
                    </h2>
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                            U
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
