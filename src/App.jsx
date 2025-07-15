import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './layout/Layout';
import Home from './pages/Home';
import ItemList from './pages/ItemList';
import Contact from './pages/Contact';
import ItemDetail from './pages/ItemDetail';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ItemList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;