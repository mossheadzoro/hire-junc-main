


import React, { useEffect, useState } from "react";
import { FaRegPaperPlane, FaImage } from "react-icons/fa";
import { BsCheckAll } from "react-icons/bs";
import axios from "axios";
import { ADD_MESSAGE, FILE_UPLOAD, GET_MESSAGES } from "../../utils/constants";
import { useRouter } from "next/router";
import { useStateProvider } from "../../context/StateContext";
import { IoMdAttach } from "react-icons/io";
function MessageContainer() {
  const router = useRouter();
  const { orderId } = router.query;
  const [{ userInfo }] = useStateProvider();
  const [recipentId, setRecipentId] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [file, setFile] = useState(null); // State to handle file uploads

  useEffect(() => {
    const getMessages = async () => {
      const {
        data: { messages: dataMessages, recipentId: recipent },
      } = await axios.get(`${GET_MESSAGES}/${orderId}`, {
        withCredentials: true,
      });
      setMessages(dataMessages);
      setRecipentId(recipent);
    };
    if (orderId && userInfo) {
      getMessages();
    }
  }, [orderId, userInfo]);

  const sendMessage = async () => {
    // Check if recipientId or message is undefined/empty
    if (!recipentId || (!messageText && !file)) {
      alert("Recipient ID or message/file is missing.");
      return;
    }

    
  
    try {
      const formData = new FormData();
      formData.append("message", messageText);
      formData.append("recipentId", recipentId);
      
      if (file) {
        formData.append("file", file); // Only append file if selected
      }
  
      const response = await axios.post(`${ADD_MESSAGE}/${orderId}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }, // Set proper headers
      });
  
      if (response.status === 201) {
        setMessages([...messages, response.data.message]);
        setMessageText("");  // Clear message input
        setFile(null);  // Clear file input
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Clear the selected file
  const clearFile = () => {
    setFile(null);
  };
const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
  return (
    <div className="h-[80vh]">
      <div className="max-h-[80vh] flex flex-col justify-center items-center">
        <div className="bg-gray-200 py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 w-[80vw] border border-black flex flex-col">
          <div className="mt-8 border border-gray-300 rounded-lg">
            <div className="space-y-4 h-[50vh] overflow-y-auto  pr-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === userInfo.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`inline-block rounded-lg ${
                      message.senderId === userInfo.id
                        ? "bg-[#1DBF73] text-white"
                        : "bg-gray-100 text-gray-800"
                    } px-4 py-2 max-w-xs break-all`}
                  >
                    <p>{message.text}</p>
                    {message.fileUrl && (
                      <a href={message.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        View File
                      </a>
                    )}
                    <span className="text-sm text-gray-600">
                      {formatTime(message.createdAt)}
                    </span>
                    <span>
                      {message.senderId === userInfo.id && message.isRead && (
                        <BsCheckAll />
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center">
            <input
              type="text"
              className="rounded-full py-2 px-4 mr-2 w-full border-black border"
              placeholder="Type a message..."
              name="message"
              onChange={(e) => setMessageText(e.target.value)}
              value={messageText}
            />
            <label className="cursor-pointer">
              <IoMdAttach className="text-gray-500 mr-2" />
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])} // Handle file selection
              />
            </label>
            {file && (
              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-2 py-1 ml-2"
                onClick={() => setFile(null)}
              >
                <span className="text-sm">Remove</span>
              </button>
            )}
            <button
              type="submit"
              className="bg-[#1DBF73] text-white rounded-full px-4 py-2 ml-2"
              onClick={sendMessage}
            >
              <FaRegPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageContainer;
