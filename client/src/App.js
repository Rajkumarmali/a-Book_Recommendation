
import './App.css';
import Navbar from './components/Navbar';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';


import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import Signup from './pages/Signup';
import { CardProvider } from './components/ContextRed';

import BooksDetails from './pages/BooksDetails';




function App() {
  return (
    <CardProvider>
      <Router>
        <Navbar />


        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/bookDetail/:bookId' element={<BooksDetails />} />
          </Routes>
        </div>


      </Router>

    </CardProvider>

  );
}

export default App;
