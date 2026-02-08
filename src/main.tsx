import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DemoAuthProvider } from "./lib/demoAuth.tsx";

createRoot(document.getElementById("root")!).render(
  <DemoAuthProvider>
    <App />
  </DemoAuthProvider>
);

