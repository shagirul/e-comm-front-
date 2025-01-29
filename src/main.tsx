import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

const SplashScreen = () => (
  <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-center px-6">
    <p className="text-lg">
      🚀 Free tier server takes time to wake from sleep.
      <br /> Please be patient, it will take some time on the first load.
    </p>
  </div>
);

const Root = () => {
  const [showSplash, setShowSplash] = useState(
    localStorage.getItem("firstVisit") !== "false"
  );

  useEffect(() => {
    if (!showSplash) return; // Don't show if already visited

    const timer = setTimeout(() => {
      setShowSplash(false);
      localStorage.setItem("firstVisit", "false"); // Store flag to prevent showing again
    }, 15000); // 15 seconds

    return () => clearTimeout(timer);
  }, [showSplash]);

  return showSplash ? <SplashScreen /> : <App />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);
