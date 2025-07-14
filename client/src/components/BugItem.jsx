import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BugItem = ({ bug, onDelete, onStatusChange }) => {
  const statusColors = {
    'open': 'red',
    'in-progress': 'orange',
    'resolved': 'green'
  };

  return (
    <div style={{ 
      border: '1px solid #ccc',
      padding: '1rem',
      marginBottom: '1rem',
      borderRadius: '4px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3>{bug.title}</h3>
          <p>{bug.description}</p>
        </div>
        <span style={{ 
          color: 'white',
          backgroundColor: statusColors[bug.status],
          padding: '0.25rem 0.5rem',
          borderRadius: '4px'
        }}>
          {bug.status.replace('-', ' ')}
        </span>
      </div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        marginTop: '1rem'
      }}>
        <div>
          Created: {new Date(bug.createdAt).toLocaleDateString()}
        </div>
        <div>
          <select
            value={bug.status}
            onChange={(e) => onStatusChange(bug._id, e.target.value)}
            style={{ marginRight: '0.5rem' }}
            data-testid="status-select"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <Link
            to={`/edit-bug/${bug._id}`}
            style={{ 
              backgroundColor: 'blue',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              marginRight: '0.5rem',
              textDecoration: 'none'
            }}
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(bug._id)}
            style={{ 
              backgroundColor: 'red',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

BugItem.propTypes = {
  bug: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired
};

export default BugItem;