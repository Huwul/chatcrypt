import React from "react";
import "./Sidebar.css";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ id, conversation, lastIdx }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    return (
        <>
            <div
                id={id}
                className={`other ${isSelected ? "sidebarclick" : ""}`}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`${isOnline ? "useronline" : "useroffline"}`}>
                    <div className="">
                        <img
                            src={conversation.profilePic}
                            alt="no photo"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
                            }}
                        ></img>
                    </div>
                </div>

                <div className="nametags">
                    <div className="nametags2">
                        <p className="nametags3">{conversation.fullName}</p>
                    </div>
                </div>
            </div>

            {!lastIdx && <hr></hr>}
        </>
    );
};
export default Conversation;
