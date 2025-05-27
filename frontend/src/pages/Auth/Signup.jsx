import React, { useState } from "react";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";

const Signup = ({ setCurrentPage }) => {
    const [profilePic, setProfilePic] = useState(null);

    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        let profileImageUrl = "";

        if (!fullName.trim()) {
            setError("Please enter full name");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password) {
            setError("Please enter the password");
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
            <h3 className="text-xl font-semibold text-black">
                Create an Account
            </h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-6">
                JOin us today entering your details below
            </p>

            <form action="" onSubmit={handleSubmit}>
                <ProfilePhotoSelector
                    image={profilePic}
                    setImage={setProfilePic}
                />

                <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                    <Input
                        value={fullName}
                        label="Full Name"
                        onChange={({ target }) => setFullName(target.value)}
                        placeholder="John"
                        type="text"
                    />
                    <Input
                        value={email}
                        label="Email"
                        onChange={({ target }) => setEmail(target.value)}
                        placeholder="john@example.com"
                        type="email"
                    />
                    <Input
                        value={password}
                        label="Password"
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder="Min 8 Characters"
                        type="password"
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm pb-2.5">{error}</p>
                )}
                <button
                    type="submit"
                    className="w-full bg-black text-white cursor-pointer py-2.5 rounded-lg hover:bg-primary/30 hover:text-primary hover:border hover:border-primary hover:font-semibold"
                >
                    SIGN UP
                </button>
                <p className="text-[13px] text-slate-800 mt-3">
                    Already have an account?{" "}
                    <button
                        onClick={() => setCurrentPage("login")}
                        className="font-medium text-primary underline cursor-pointer"
                    >
                        Login
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Signup;
