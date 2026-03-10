import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeddingPage from "./pages/WeddingPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeddingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;