import React from "react";
import { THEMES } from "../constants/index.js";
import { Send } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore.js";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hello! How are you?", isSent: false },
  { id: 2, content: "I'm good, thanks! How about you?", isSent: true },
];

const SettingPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen container mx-auto p-4 pt-20 max-w-6xl">
      <div className="space-y-10">
        {/* LEFT SIDE - Theme Selection */}
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Theme</h2>
            <p className="text-sm text-base-content/70">
              Choose a theme for your chat app
            </p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all ${
                  theme === t
                    ? "bg-base-200 ring-2 ring-primary"
                    : "hover:bg-base-200/50"
                }`}
                onClick={() => setTheme(t)}
              >
                <div
                  className="relative h-8 w-full rounded-md overflow-hidden"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-[11px] font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - Live Chat Preview */}
        <div className="bg-base-200 rounded-2xl shadow-lg p-4 flex flex-col h-[500px]">
          <div className="font-semibold mb-4">Live Preview</div>

          <div className="flex-1 overflow-y-auto space-y-3">
            {PREVIEW_MESSAGES.map((msg) => (
              <div
                key={msg.id}
                className={`chat ${msg.isSent ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-bubble">{msg.content}</div>
              </div>
            ))}
          </div>

          {/* Fake input area */}
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="input input-bordered w-full"
                disabled
              />
              <button className="btn btn-primary btn-square" disabled>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
