import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BugList from './pages/BugList';
import BugForm from './pages/BugForm';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<BugList />} />
            <Route path="/add-bug" element={<BugForm />} />
            <Route path="/edit-bug/:id" element={<BugForm />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;