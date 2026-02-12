import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar Placeholder */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-indigo-600">AuraHealth</h1>
                </div>
                <nav className="mt-6 px-4">
                    <a href="/" className="block py-2 px-4 bg-indigo-50 text-indigo-700 rounded-md">Dashboard</a>
                    <a href="/workouts" className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-md">Workouts</a>
                    <a href="/profile" className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-md">Profile</a>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">Welcome, User</span>
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
