import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { EditorPage } from "@/pages/EditorPage";
import { FloatingNav } from "@/components/FloatingNav";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
      <FloatingNav position="bottom-left" />
    </BrowserRouter>
  );
}

export default App;
