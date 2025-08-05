import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContextTemp.jsx'; // ✅ Make sure this path is correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <WishlistProvider> {/* ✅ Wrap your whole app in this */}
      <App />
    </WishlistProvider>
  </BrowserRouter>
);
