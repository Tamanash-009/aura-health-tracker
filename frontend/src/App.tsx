import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Layout from './components/Layout'

import UserProfile from './pages/UserProfile'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="workouts" element={<Dashboard />} /> {/* Reusing Dashboard for now as it has history */}
                    <Route path="profile" element={<UserProfile />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
