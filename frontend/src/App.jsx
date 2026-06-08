import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register'
import { AuthProvider } from './services/auth.context.jsx';
import Protected from './components/Protected.jsx';

function App() {
  return (
   <>
   <AuthProvider>
      <BrowserRouter>
          <Routes>
              
              <Route path='/' element={<Protected><h1>Home Page</h1></Protected>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
   </>
  )
}

export default App;
