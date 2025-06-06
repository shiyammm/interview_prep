import React from "react";

const DeleteAlertContent = ({ content, onDelete }) => {
    return (
        <div className="p-5">
            <p className="text-[14px]">{content}</p>
            <div className="flex justify-end mt-6">
                <button className="bg-amber-500 px-5 py-1 text-white rounded-lg text-md cursor-pointer font-medium tracking-wide" type="button" onClick={onDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteAlertContent;
