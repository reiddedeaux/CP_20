import React, { useState } from 'react';

const TourCard = ({ id, name, info, image, price, onRemove }) => {
    return (
        <div className="tour-card" style={styles.card}>
            <img src={image} alt={name} style={styles.image} />
            <div style={styles.details}>
                <h2>{name}</h2>
                <p>{info}</p>
                <h3>${price}</h3>
                <button onClick={() => onRemove(id)} style={styles.button}>
                    Not Interested
                </button>
            </div>
        </div>
    );
};

const TourList = ({ tours }) => {
    const [tourList, setTourList] = useState(tours);

    const handleRemove = (id) => {
        setTourList(tourList.filter((tour) => tour.id !== id));
    };

    return (
        <div>
            {tourList.map((tour) => (
                <TourCard key={tour.id} {...tour} onRemove={handleRemove} />
            ))}
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        maxWidth: '400px',
    },
    image: {
        width: '100%',
        borderRadius: '8px',
    },
    details: {
        textAlign: 'center',
    },
    button: {
        marginTop: '12px',
        padding: '8px 16px',
        backgroundColor: '#ff4d4d',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default TourList;