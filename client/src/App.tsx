
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import Header from "./components/Header";
import About from "./components/About";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;