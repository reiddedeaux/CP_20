import React, { useState, useEffect } from 'react';
import TourCard from './TourCard';

const Gallery = ({ destination }) => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTours = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/tours?destination=${destination}`);
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

        if (destination) {
            fetchTours();
        }
    }, [destination]);

    if (loading) {
        return <p>Loading tours...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (tours.length === 0) {
        return <p>No tours available for the selected destination.</p>;
    }

    return (
        <div className="gallery">
            {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
            ))}
        </div>
    );
};

export default Gallery;