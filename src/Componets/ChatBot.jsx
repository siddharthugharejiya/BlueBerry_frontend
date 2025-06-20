import { useState } from "react";
import axios from "axios";
import { FiSend, FiX, FiMessageSquare } from "react-icons/fi";

export function Chatbot() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [showChat, setShowChat] = useState(false);

    const sendMessage = async () => {
        if (!input) return;
        const userMsg = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);

        try {
            const res = await axios.post("http://localhost:9595/chat", { message: input });
            const botMsg = { sender: "bot", text: res.data.reply };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Bot error occurred. Please try again later." },
            ]);
        }
        setInput("");
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {!showChat && (
                <button
                    onClick={() => setShowChat(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-md transition-colors"
                >
                    <FiMessageSquare className="w-5 h-5" />
                </button>
            )}

            {showChat && (
                <div className="sm:w-80 w-60 h-96 bg-white rounded-lg shadow-lg flex flex-col border border-gray-200">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-lg">
                        <div className="flex items-center space-x-2">
                            <FiMessageSquare className="w-5 h-5" />
                            <h2 className="font-bold">AI Assistant</h2>
                        </div>
                        <button
                            onClick={() => setShowChat(false)}
                            className="text-white hover:text-gray-200"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-3 overflow-y-auto bg-gray-50 space-y-2">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 h-full flex items-center justify-center">
                                Ask me anything!
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`max-w-[80%] px-3 py-2 rounded-lg ${msg.sender === "user"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-gray-200 bg-white">
                        <div className="flex rounded-md overflow-hidden border border-gray-300">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                className="flex-1 sm:px-3 px-0 py-2 focus:outline-none"
                                placeholder="Type your message..."
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!input}
                                className={`px-3 py-2 ${input
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-500"
                                    }`}
                            >
                                <FiSend className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}