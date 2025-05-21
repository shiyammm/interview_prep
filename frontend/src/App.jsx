import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Home/Dashboard";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Auth/Signup";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import Login from "./pages/Auth/Login";
import { Toaster } from "react-hot-toast";

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/interview-prep/:sessionId"
                        element={<InterviewPrep />}
                    />
                </Routes>
            </Router>

            <Toaster
                toastOptions={{
                    className: "",
                    style: {
                        fontSize: "13px",
                    },
                }}
            />
        </>
    );
};

export default App;
