import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";

const Login = ({ setCurrentPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic validations
        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        if (password.length < 8) {
            setError("Password must have at least 8 characters");
            return;
        }

        setError("");

        try {
            //
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                "Something went wrong. Please try again.";
            setError(message);
        }
    };

    return (
        <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-black">Welcome back</h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-6">
                Please enter your details to log in
            </p>
            <form action="" onSubmit={handleLogin}>
                <Input
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    label="Email Address"
                    placeholder="john@exmaple.com"
                    type="text"
                />
                <Input
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    label="Password"
                    placeholder="Min 8 Characters"
                    type="password"
                />

                {error && (
                    <p className="text-red-500 text-xs pb-2.5">{error}</p>
                )}
                <button
                    type="submit"
                    className="w-full bg-black text-white cursor-pointer py-2.5 rounded-lg hover:bg-primary/30 hover:text-primary hover:border hover:border-primary hover:font-semibold"
                >
                    LOGIN
                </button>

                <p className="text-[13px] text-slate-800 mt-3">
                    Don't have an account?{" "}
                    <button
                        className="font-medium text-primary underline cursor-pointer"
                        onClick={() => setCurrentPage("signup")}
                    >
                        SignUp
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;
