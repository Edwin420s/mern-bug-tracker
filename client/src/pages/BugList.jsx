import React, { useState, useEffect } from 'react';
import api from '../api';
import BugItem from '../components/BugItem';

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      const response = await api.get('/bugs');
      setBugs(response.data);
    } catch (err) {
      console.error('Failed to fetch bugs:', err);
      setError('Failed to fetch bugs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/bugs/${id}`);
      setBugs(prev => prev.filter(bug => bug._id !== id));
    } catch (err) {
      console.error('Failed to delete bug:', err);
      setError('Failed to delete bug. Please try again.');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await api.put(`/bugs/${id}`, { status });
      setBugs(prev =>
        prev.map(bug => (bug._id === id ? response.data : bug))
      );
    } catch (err) {
      console.error('Failed to update bug status:', err);
      setError('Failed to update bug status.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div data-testid="bug-list">
      <h1>Bug Tracker</h1>
      {bugs.length === 0 ? (
        <p>No bugs found. Create one!</p>
      ) : (
        bugs.map(bug => (
          <BugItem 
            key={bug._id} 
            bug={bug} 
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))
      )}
    </div>
  );
};

export default BugList;
