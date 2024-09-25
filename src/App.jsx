import { useState } from 'react';
import './App.css';
import Contact from "./components/contact";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header';
import Login from './auth/login';
import Create from './auth/create';
import Home from "./pages/home";
import Detail from './pages/productdetail';
import Product from './pages/product';
import Theme from './components/theme';
import CardProvider from './context/theme';
import CheckOut from './pages/checkout';
function App() {
  const [count, setCount] = useState(0);

  // Move the useLocation inside the component where it is inside the BrowserRouter
  function Layout() {
    const location = useLocation();
  

    return (
      <>
        {/* Conditionally render Header */}
       
        <CardProvider>
        {!location.pathname.startsWith("/auth") && <Header />}

          {/* <Theme/> */}
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/checkout" element={<CheckOut />} />

          <Route path="/product/:id" element={<Detail/>} />

          {/* Auth routes */}
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="create" element={<Create />} />
          </Route>
        </Routes>
        </CardProvider>
      </>
    );
  }

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
