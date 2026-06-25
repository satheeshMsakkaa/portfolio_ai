import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import API from "../services/api";

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesRef = useRef(null);

  const ask = async () => {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentQuestion = question;
    setQuestion("");
    setLoading(true);

    try {
      const portfolio = JSON.parse(
        localStorage.getItem("dashboard")
      );

      const res = await API.post(
        "/chat",
        {
          question:
            currentQuestion,
          portfolio,
        }
      );

      let aiResponse = "";
      if (res.data?.answer?.error?.error) {
        aiResponse = res.data.answer.error?.error?.message || "Sorry, I couldn't process your request.";
      } else if (res.data?.answer?.result) {
        aiResponse = res.data?.answer?.result;
      } else {
        aiResponse = res.data?.answer || "Sorry, I couldn't process your request.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            aiResponse,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't process your request.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      messagesRef.current
    ) {
      messagesRef.current.scrollTop =
        messagesRef.current
          .scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="h-full flex flex-col">

      {/* Messages */}

      <div
        ref={messagesRef}
        className="
          flex-1
          overflow-y-auto
          bg-slate-50
          p-4
          space-y-4
        "
      >

        {messages.length ===
          0 && (
          <div className="text-center text-gray-500 mt-10">
            <h3 className="font-semibold text-lg">
              AI Portfolio
              Assistant
            </h3>

            <p className="mt-2">
              Ask about risk,
              diversification,
              allocation,
              returns, or
              market news.
            </p>
          </div>
        )}

        {messages.map(
          (
            message,
            index
          ) => (
            <div
              key={index}
              className={`flex ${
                message.role ===
                "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`
                  max-w-[80%]
                  px-4
                  py-3
                  rounded-2xl
                  shadow-sm
                  ${
                    message.role ===
                    "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border"
                  }
                `}
              >
                <ReactMarkdown>
                  {
                    message.content
                  }
                </ReactMarkdown>
              </div>
            </div>
          )
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border rounded-2xl px-4 py-3">

              <div className="flex gap-1">

                <span className="animate-bounce">
                  ●
                </span>

                <span
                  className="animate-bounce"
                  style={{
                    animationDelay:
                      "0.1s",
                  }}
                >
                  ●
                </span>

                <span
                  className="animate-bounce"
                  style={{
                    animationDelay:
                      "0.2s",
                  }}
                >
                  ●
                </span>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* Input Area */}

      <div className="border-t bg-white p-4">

        <div className="flex gap-2">

          <textarea
            rows={1}
            value={question}
            placeholder="Ask about your portfolio..."
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            onKeyDown={(
              e
            ) => {
              if (
                e.key ===
                  "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();
                ask();
              }
            }}
            className="
              flex-1
              border
              rounded-xl
              px-4
              py-3
              resize-none
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <button
            onClick={ask}
            disabled={
              !question.trim() ||
              loading
            }
            className="
              bg-blue-600
              text-white
              px-5
              rounded-xl
              hover:bg-blue-700
              disabled:opacity-50
            "
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}