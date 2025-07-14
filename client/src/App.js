import React from 'react';
import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import BugList from './pages/BugList';
import BugForm from './pages/BugForm';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import './App.css';

// Create custom browser history for React Router
const history = createBrowserHistory({ window });

function App() {
  return (
    <HistoryRouter history={history}>
      <ErrorBoundary>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<BugList />} />
            <Route path="/add-bug" element={<BugForm />} />
            <Route path="/edit-bug/:id" element={<BugForm />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </HistoryRouter>
  );
}

export default App;
