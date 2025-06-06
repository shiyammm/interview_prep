import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import { appFeat } from "../utils/data";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Modal from "../components/Loader/Modal";
import { UserContext } from "../context/useContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const LandingPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");

    const handleLanding = () => {
        if (!user) {
            setOpenAuthModal(true);
        } else {
            navigate("/dashboard");
        }
    };
    const onClose = () => {
        setOpenAuthModal(false);
        setCurrentPage("login");
    };

    return (
        <>
            <div className="w-full min-h-full bg-[#fffcef]">
                <div className="w-[580px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0" />

                <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
                    <header className="flex justify-between items-center mb-16">
                        <div className="text-xl text-black font-bold">
                            Interview Pre AI
                        </div>
                        {user ? (
                            <ProfileInfoCard />
                        ) : (
                            <button
                                className="bg-linear-to-r from-[#ff9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer"
                                onClick={() => setOpenAuthModal(!openAuthModal)}
                            >
                                Login / Signup
                            </button>
                        )}
                    </header>

                    <div className="flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-1/2 pr-4 md-8 md:mb-0">
                            <div className="flex items-center justify-left mb-2">
                                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                                    <LuSparkles /> AI Powered
                                </div>
                            </div>
                            <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                                Ace Interview with <br />
                                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#ff9324_0%,_#fcd760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold ">
                                    AI-Powered
                                </span>{" "}
                                Learning
                            </h1>
                        </div>
                        <div className="w-full md:w-1/2">
                            <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                                Get role-specific questions, expand answers when
                                you need them, dive deeper into concepts, and
                                organize everything your way. From preparation
                                to mastery - your ultimate interview toolkit is
                                here.
                            </p>

                            <button
                                onClick={handleLanding}
                                className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full min-h-full relative z-10">
                <div>
                    <div className="flex items-center justify-center -mt-36">
                        <img
                            src=""
                            alt="Hero Image"
                            className="w-[88vw] rounded-lg"
                        />
                    </div>
                </div>

                <div className="w-full min-h-full bg-[#fffcef] mt-10">
                    <div className="container mx-auto px-4 pt-10 pb-20">
                        <div className="mt-5">
                            <h2 className="text-2xl font-medium text-center mb-12">
                                Features That Make You Shine
                            </h2>

                            <div className="flex flex-col items-center gap-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                                    {appFeat.slice(0, 3).map((feat) => (
                                        <div
                                            key={feat.id}
                                            className="bg-[#fffeff8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                                        >
                                            <h3 className="text-base font-semibold mb-3">
                                                {feat.title}
                                            </h3>
                                            <p className="tex-gray-600">
                                                {feat.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {appFeat.slice(3).map((feat) => (
                                        <div
                                            key={feat.id}
                                            className="bg-[#fffeff8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                                        >
                                            <h3 className="text-base font-semibold mb-3">
                                                {feat.title}
                                            </h3>
                                            <p className="tex-gray-600">
                                                {feat.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
                    Made with ❤️
                </div>
            </div>

            <Modal isOpen={openAuthModal} onClose={onClose} hideHeader>
                <div>
                    {currentPage === "login" && (
                        <Login setCurrentPage={setCurrentPage} />
                    )}
                    {currentPage === "signup" && (
                        <Signup setCurrentPage={setCurrentPage} />
                    )}
                </div>
            </Modal>
        </>
    );
};

export default LandingPage;
