import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import moment from "moment";
import RoleInfoHeader from "./RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { AnimatePresence, motion } from "framer-motion";
import QuestionCard from "../../components/Cards/QuestionCard";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import AIResponsePreview from "./AIResponsePreview";
import Drawer from "../../components/Loader/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import toast from "react-hot-toast";

const InterviewPrep = () => {
    const { sessionId } = useParams();

    const [sessionData, setSessionData] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
    const [explanation, setExplanation] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isUpdateLoader, setIsUpdateLoader] = useState(false);

    const fetchSessionDetailsById = async () => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.SESSION.GET_ONE(sessionId)
            );

            if (response.data && response.data.session) {
                setSessionData(response.data.session);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const generateConceptExplanation = async (question) => {
        try {
            setErrorMsg("");
            setExplanation(null);

            setIsLoading(true);
            setOpenLearnMoreDrawer(true);

            const response = await axiosInstance.post(
                API_PATHS.AI.GENERATE_EXPLANATION,
                { question }
            );
            if (response.data) {
                setExplanation(response.data);
            }
        } catch (error) {
            setExplanation(null);
            setErrorMsg("Failed to generate explanation, Try again later");
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleQuestionPinStatus = async (questionId) => {
        try {
            const response = await axiosInstance.post(
                API_PATHS.QUESTION.PIN(questionId)
            );
            if (response.data && response.data.question) {
                fetchSessionDetailsById();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const uploadMoreQuestions = async () => {
        try {
            setIsUpdateLoader(true);

            const aiResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_QUESTIONS,
                {
                    role: sessionData?.role,
                    experience: sessionData?.experience,
                    topicsToFocus: sessionData?.topicsToFocus,
                    numberOfQuestions: 10
                }
            );

            const generatedQuestions = aiResponse.data;

            const response = await axiosInstance.post(
                API_PATHS.QUESTION.ADD_TO_SESSION,
                {
                    sessionId,
                    questions: generatedQuestions
                }
            );
            if (response.data) {
                toast.success("Added More Q&A!");
                fetchSessionDetailsById();
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg("Something went wrong. Please try again. ");
            }
        } finally {
            setIsUpdateLoader(false);
        }
    };

    useEffect(() => {
        if (sessionId) {
            fetchSessionDetailsById();
        }

        return () => {};
    }, []);

    return (
        <DashboardLayout>
            <RoleInfoHeader
                role={sessionData?.role || ""}
                topicsToFocus={sessionData?.topicsToFocus || ""}
                experience={sessionData?.experience || ""}
                questions={sessionData?.questions?.length || ""}
                description={sessionData?.description || ""}
                lastUpdated={
                    sessionData?.updatedAt
                        ? moment(sessionData.updatedAt).format("Do MM YYYY")
                        : ""
                }
            />

            <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
                <h2 className="text-lg font-semibold color-black">
                    <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
                        <div
                            className={`col-span-12 ${
                                openLearnMoreDrawer
                                    ? "md:col-span-7"
                                    : "md:col-span-8"
                            }`}
                        >
                            <AnimatePresence>
                                {sessionData?.questions?.map((data, i) => {
                                    return (
                                        <motion.div
                                            key={data._id || i}
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.05 }}
                                            transition={{
                                                duration: 0.4,
                                                type: "spring",
                                                delay: i * 0.1,
                                                damping: 15
                                            }}
                                            layout
                                            layoutId={`question-${
                                                data._id || i
                                            }`}
                                        >
                                            <>
                                                <QuestionCard
                                                    question={data?.question}
                                                    answer={data?.answer}
                                                    onLearnMore={() =>
                                                        generateConceptExplanation(
                                                            data.question
                                                        )
                                                    }
                                                    isPinned={data?.isPinned}
                                                    onTogglePin={() =>
                                                        toggleQuestionPinStatus(
                                                            data._id
                                                        )
                                                    }
                                                />
                                            </>
                                            {!isLoading &&
                                                sessionData?.questions
                                                    ?.length ==
                                                    i + 1 && (
                                                    <div className="flex item-center justify-center mt-5">
                                                        <button
                                                            className="flex items-center gap-3 text-sm text-white bg-black font-medium px-5 py-2 mr-2 rounded text-nowrap cursor-pointer "
                                                            disabled={
                                                                isLoading ||
                                                                isUpdateLoader
                                                            }
                                                            onClick={
                                                                uploadMoreQuestions
                                                            }
                                                        >
                                                            {isUpdateLoader ? (
                                                                <SpinnerLoader />
                                                            ) : (
                                                                <LuListCollapse className="text-lg" />
                                                            )}{" "}
                                                            Load More
                                                        </button>
                                                    </div>
                                                )}
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                </h2>
            </div>
            <div>
                <Drawer
                    isOpen={openLearnMoreDrawer}
                    onClose={() => setOpenLearnMoreDrawer(false)}
                    title={!isLoading && explanation?.title}
                >
                    {errorMsg && (
                        <p className="flex gap-2 text-sm text-amber-600 font-medium">
                            <LuCircleAlert
                                content={explanation?.explanation}
                                className="mt-1"
                            />
                        </p>
                    )}
                    {isLoading && <SkeletonLoader />}
                    {!isLoading && explanation && (
                        <AIResponsePreview content={explanation?.explanation} />
                    )}
                </Drawer>
            </div>
        </DashboardLayout>
    );
};

export default InterviewPrep;
