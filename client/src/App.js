import './App.css';
import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import OnlyAdminProtectedRoute from './OnlyAdminProtectedRoute';
import CreateArticle from './components/CreateArticle';
import UpdateArticle from './components/UpdateArticle';
import ArticlePage from './components/ArticlePage';
import Services from './components/Services';
import ScrollToTop from './components/ScrollToTop';


function App() {

  return (
    <>
    <ScrollToTop/>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Services' element={<Services />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminProtectedRoute />}>
          <Route path='/create-article' element={<CreateArticle />} />
          <Route path='/update-article/:articleId' element={<UpdateArticle />} />
        </Route>
        <Route path='/article/:articleSlug' element={<ArticlePage />} />
      </Routes>


      <Footer />

    </>
  );
}

export default App;
