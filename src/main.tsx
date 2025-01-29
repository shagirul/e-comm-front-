import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

const SplashScreen = ({ countdown }: { countdown: number }) => (
  <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-center px-6">
    <p className="text-lg">
      🚀 Free tier server takes time to wake from sleep.
      <br /> Please be patient, it will take some time on the first load.
      <br />
      <span className="mt-4 block">Countdown: {countdown} seconds</span>
    </p>
  </div>
);

const ReloadPrompt = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center px-6 gap-5">
    <p className="text-lg">Please refresh the page to continue.</p>
    <button
      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
      onClick={() => window.location.reload()}
    >
      Reload Page
    </button>
  </div>
);

const Root = () => {
  const [showSplash, setShowSplash] = useState(
    localStorage.getItem("firstVisit") !== "false"
  );
  const [countdown, setCountdown] = useState(15); // Countdown state
  const [showReloadPrompt, setShowReloadPrompt] = useState(false);

  useEffect(() => {
    if (!showSplash) return; // Don't show if already visited

    // Countdown timer
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer); // Stop countdown at 0
          setShowReloadPrompt(true); // Show reload prompt when time is up
        }
        return prev - 1;
      });
    }, 1000);

    // Timeout for splash screen
    const timer = setTimeout(() => {
      setShowSplash(false);
      localStorage.setItem("firstVisit", "false"); // Store flag to prevent showing again
    }, 15000); // 15 seconds

    // Cleanup on component unmount
    return () => {
      clearInterval(countdownTimer);
      clearTimeout(timer);
    };
  }, [showSplash]);

  return showSplash ? (
    <SplashScreen countdown={countdown} />
  ) : showReloadPrompt ? (
    <ReloadPrompt />
  ) : (
    <App />
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);
