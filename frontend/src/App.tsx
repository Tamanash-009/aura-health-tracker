import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp } from '@clerk/clerk-react'
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'
import UserProfile from './pages/UserProfile'
import AuthSync from './components/AuthSync'
import Workouts from './pages/Workouts'

function App() {
    return (
        <Router>
            <AuthSync />
            <Routes>
                <Route path="/login/*" element={<div className="flex justify-center items-center min-h-screen bg-gray-50"><SignIn routing="path" path="/login" /></div>} />
                <Route path="/signup/*" element={<div className="flex justify-center items-center min-h-screen bg-gray-50"><SignUp routing="path" path="/signup" /></div>} />

                <Route path="/" element={
                    <>
                        <SignedIn>
                            <Layout />
                        </SignedIn>
                        <SignedOut>
                            <RedirectToSignIn />
                        </SignedOut>
                    </>
                }>
                    <Route index element={<Dashboard />} />
                    <Route path="workouts" element={<Workouts />} />
                    <Route path="profile" element={<UserProfile />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
