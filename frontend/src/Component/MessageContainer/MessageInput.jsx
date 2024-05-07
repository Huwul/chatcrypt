import React from "react";
import "./MessageContainer.css";
import { LuSend } from "react-icons/lu";
import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";
import useSendGroupMessage from "../../hooks/useSendGroupMessages";
import { GrFormAttachment } from "react-icons/gr";
import useConversation from "../../zustand/useConversation";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null); // add this line
    const { loading: loadingOneToOne, sendMessage } = useSendMessage();
    const { loading: loadingGroup, sendGroupMessage } = useSendGroupMessage();
    const { selectedConversation } = useConversation();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // add this line
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message && !file) return; // modify this line

        if (
            selectedConversation &&
            selectedConversation.users &&
            selectedConversation.users.length >= 1
        ) {
            const groupId = selectedConversation._id;
            await sendGroupMessage(groupId, message, file); // modify this line
        } else {
            await sendMessage(message, file); // modify this line
        }

        setMessage("");
        setFile(null); // add this line
    };

    return (
        <form className="messageinput1" onSubmit={handleSubmit}>
            <div className="messageinput2">
                <input
                    type="text"
                    className="messageinput3"
                    placeholder="Send a message.."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <input
                    type="file"
                    onChange={handleFileChange} // add this line
                />
                <button type="submit" className="messageinput4">
                    <LuSend />
                </button>
            </div>
        </form>
    );
};
export default MessageInput;