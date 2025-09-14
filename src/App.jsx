import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignupPage from './pages/signup'
import LoginPage from './pages/login'
import MessageBox from './pages/MessageInput'
import ChatBox from './pages/chatbox'
import UserApp from './pages/username'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InviteChat from './pages/invite'
import GenCode from './pages/generatechatcode'
import ChatRoomPage from './pages/hub'


function App() {
  return (
    <BrowserRouter>
      <div>
      <ToastContainer 
        position="top-right"
        autoClose={3000} // closes after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
          <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/messagebox" element={<MessageBox />} />
          <Route path="/username" element={<UserApp />} />
          <Route path="/chatbox" element={<ChatBox />} />
          <Route path="/verifycode" element={<InviteChat />} />
          <Route path="/chatcode" element={<GenCode />} />
          <Route path="/hub" element={<ChatRoomPage/>} />
        </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
