//CSS
import './App.css';
//Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

//Context
import { AuthProvider } from './context/AuthContext';

import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

//hooks
import { useState,useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthtication';


//Pages
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { CreatePost } from './pages/CreatePost/CreatePost';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { NotFound } from './pages/404/NotFound';

function App() {

  const [user,setUser] = useState(undefined);
  const {auth} = useAuthentication()

  const loadingUser = user === undefined
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  },[auth])


  return (
    <div className="App">
     <AuthProvider value={{user}}>
        <BrowserRouter>
             <Navbar />
           <div className="container">
               <Routes>
                 <Route path="/" element={<Home />} />
                 <Route path="/about" element={<About />} />
                 <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/> } />
                 <Route path="/register" element={!user ? <Register /> : <Navigate to="/" /> } />
                 <Route path="/post/create" element={<CreatePost />} />
                 <Route path ="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                 <Route path="*" element={<NotFound/>} />
               </Routes>
           </div>
           <Footer />
        </BrowserRouter>
     </AuthProvider>
    </div>
  );
}

export default App;
