import React, { useState, useEffect } from 'react';

const App = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('https://api.example.com/tours');
        if (!response.ok) {
          throw new Error('Failed to fetch tours');
        }
        const data = await response.json();
        setTours(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const filteredTours = tours.filter((tour) =>
    tour.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <ChildComponent
        tours={filteredTours}
        loading={loading}
        error={error}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
};

const ChildComponent = ({ tours, loading, error, filter, setFilter }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Filter tours"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {tours.map((tour) => (
          <li key={tour.id}>{tour.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;