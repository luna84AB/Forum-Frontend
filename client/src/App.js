import axios from "axios";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { UserContext } from "./context/UserContext";
import Header from "./Components/Header/Header";
import SignUp from "./pages/SignUP/SignUp";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import Footer from "./Components/Footer/Footer";
import QuestinDetail from "./pages/QuestionDetail/QuestionDetail";
import NotFound from "./Components/NotFound/Notfound";
import ResetSent from "./ForgotPassword/ResetSent";
import ForgotPassword from "./ForgotPassword/ForgotPassword";

function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    } else   {
      try{
      const userRes = await axios.get("http://localhost:4000/api/users", {
        headers: { "x-auth-token": token },
      });
      // console.log(userRes);
      setUserData({
        token,
        user: {
          id: userRes.data.data.user_id,
          display_name: userRes.data.data.user_name,
        },
      });
    }catch (err) {
      console.log("problem", err);
    };
    }
  };
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  
  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <Router>
      <Header logout={logout} />
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home logout={logout} />} />
        <Route path="/ask-question" element={<AskQuestion />} />
        <Route path="/questions/:id" element={<QuestinDetail/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-sent" element={<ResetSent />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />
    </Router>
  );
}
export default App;