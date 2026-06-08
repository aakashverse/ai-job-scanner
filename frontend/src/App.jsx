import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register'
import { AuthProvider } from './context/auth.context.jsx';
import Protected from './components/Protected.jsx';
import Home from './pages/Home.jsx';
import Interview from './pages/Interview.jsx'
import { InterviewProvider } from './context/interview.context.js';

function App() {
  return (
   <>
   <AuthProvider>
      <InterviewProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Protected><Home/></Protected>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/interview/:interviewId" element={<Protected><Interview/></Protected>}/>
            </Routes>
        </BrowserRouter>
      </InterviewProvider>
    </AuthProvider>
   </>
  )
}

export default App;
