import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./pages/ListPage";
import Login from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>
  );
}

export default App;
