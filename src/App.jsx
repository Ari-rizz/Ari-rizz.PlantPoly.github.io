import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import Problem from './Problem';
import Solution from './Solution';
import Contact from './Contact';
import Blog from './Blog'; // Ny Blogg-komponent
import Login from './Login'; // Ny login-komponent

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={
            <div>
              <Hero />
              <Problem />
              <Solution />
              <Contact />
            </div>
          } />
          <Route path="/blog" element={<Blog isAuthenticated={isAuthenticated} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
