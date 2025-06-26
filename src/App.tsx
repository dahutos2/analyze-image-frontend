import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ImageProvider } from './context/ImageContext';
import Home from './pages/Home';
import Image from './pages/Image';

const App: React.FC = () => {
  return (
    <ImageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/image" element={<Image />} />
        </Routes>
      </Router>
    </ImageProvider>
  );
};

export default App;
