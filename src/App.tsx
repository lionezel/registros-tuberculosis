import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, ScheduledVisits } from "./Page";
import { AuthProvider } from "./context/AuthProvider";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ScheduledVisits" element={<ScheduledVisits />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
