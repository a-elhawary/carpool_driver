import './App.css';
import ListRoutes from './screens/ListRoutes/ListRoutes';
import AddRoute from './screens/AddRoute/AddRoute';
import Login from "./screens/Login/Login";
import Register from "./screens/Login/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<ListRoutes />} />
        <Route path="/add" element={<AddRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
