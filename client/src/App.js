import './App.css';
import Home from './pages/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Navbar from './components/navbar';
import Footer from './components/footerpage';
import Register from './pages/register'
import Login from './pages/login';


// import Search from './components/search';


function App() {


  return (
    <BrowserRouter>
      <div>
        <ToastContainer theme='light' position='top-center' />
        <Navbar />
        <Routes>


          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Home' element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
