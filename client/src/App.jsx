import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import PlayPage from "./pages/PlayPage";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/play/:imageId" element={<PlayPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
