import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, label, placeholder, type }) => {
    const [showPassWord, setShowPassWord] = useState(false);
    const toggleShowPassword = () => {
        setShowPassWord(!showPassWord);
    };
    return (
        <div className="">
            <label htmlFor="" className="font-medium">
                {label}
            </label>
            <div className="w-full border border-gray-200 p-2 rounded-xs bg-gray-50 flex justify-between mb-5 mt-3 focus-within:border-primary transition-colors duration-200">
                <input
                    type={
                        type === "password"
                            ? showPassWord
                                ? "text"
                                : "password"
                            : type
                    }
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none text-sm"
                    value={value}
                    onChange={(e) => onChange(e)}
                />

                {type === "password" && (
                    <>
                        {showPassWord ? (
                            <FaRegEye
                                size={22}
                                className="text-primary cursor-pointer"
                                onClick={toggleShowPassword}
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={22}
                                className="text-slate-400 cursor-pointer"
                                onClick={toggleShowPassword}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Input;
