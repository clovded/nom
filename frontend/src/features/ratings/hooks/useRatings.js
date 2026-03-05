import { useEffect, useState } from 'react';
import { api } from '../../../services/api';

const useRatings = () => {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRatings = async () => {
        try {
            setLoading(true);
            const data = await api('/api/ratings');
            setRatings(data);
            setError(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRatings();
    }, []);

    return { ratings, loading, error, refreshRatings: fetchRatings };
};

export default useRatings;
