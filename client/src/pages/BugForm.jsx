import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000/api/bugs';

const BugForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchBug = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${API_BASE_URL}/${id}`);
          setFormData(response.data);
        } catch (err) {
          console.error('Failed to fetch bug:', err);
          setErrors(prev => ({
            ...prev,
            fetch: 'Failed to load bug details. Please try again.'
          }));
        } finally {
          setLoading(false);
        }
      };
      fetchBug();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple validation
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = id
        ? await axios.put(`${API_BASE_URL}/${id}`, formData)
        : await axios.post(API_BASE_URL, formData);

      navigate('/');
    } catch (err) {
      console.error('Failed to save bug:', err);
      setErrors({
        submit: err.response?.data?.message || 'Failed to save bug'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Bug' : 'Report New Bug'}</h2>
      {errors.fetch && <p className="text-red-500">{errors.fetch}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            data-testid="bug-title"
            disabled={loading}
          />
          {errors.title && <span className="text-red-500">{errors.title}</span>}
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            data-testid="bug-description"
            disabled={loading}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description}</span>
          )}
        </div>

        <div>
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            data-testid="bug-status"
            disabled={loading}
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {errors.submit && <p className="text-red-500">{errors.submit}</p>}

        <button type="submit" disabled={loading} data-testid="submit-bug">
          {loading ? 'Saving...' : id ? 'Update Bug' : 'Submit Bug'}
        </button>
      </form>
    </div>
  );
};

export default BugForm;
