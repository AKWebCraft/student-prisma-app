import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Result from "./pages/Result";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/result" element={<Result />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
