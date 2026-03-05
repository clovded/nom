import { useEffect, useState } from 'react';
import { pb } from '../../../services/pocketbase';

const useRatings = () => {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRatings = async () => {
        try {
            setLoading(true);
            const records = await pb.collection('ratings').getFullList({
                sort: '-created',
                expand: 'user,location'
            });
            setRatings(records);
            setError(null);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching ratings:', error);
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
