import { useState } from 'react';
import { getOrCreateLocation } from '../../../services/ratingsService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const useFoodRating = ({ location, currentUser, onClose }) => {
    const [taste, setTaste] = useState(0);
    const [ambiance, setAmbiance] = useState(0);
    const [foodComa, setFoodComa] = useState(0);
    const [service, setService] = useState(0);
    const [noise, setNoise] = useState(0);
    const [creativity, setCreativity] = useState(0);
    const [image, setImage] = useState([]);
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const getLocationName = () => {
        if (location?.display_name) return location.display_name.split(',')[0];
        if (location?.name) return location.name;
        return "Unknown Location";
    };

    const saveRatings = async () => {
        setIsLoading(true);
        setError('');

        try {
            const locationRecord = await getOrCreateLocation(location);

            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('location', locationRecord._id);
            formData.append('taste', taste || 0);
            formData.append('ambiance', ambiance || 0);
            formData.append('foodComa', foodComa || 0);
            formData.append('service', service || 0);
            formData.append('noise', noise || 0);
            formData.append('creativity', creativity || 0);
            formData.append('comment', comment || '');
            image.forEach(file => formData.append('images', file));

            const res = await fetch(`${API_URL}/api/ratings`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Error saving rating');
            }

            alert('Rating saved successfully');
            onClose();
        } catch (error) {
            setError('Error saving rating: ' + (error.message || 'Unknown error'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e) => {
        setImage(Array.from(e.target.files));
    };

    const handleRemoveImage = () => {
        setImage([]);
        const fileInput = document.getElementById('image-upload');
        if (fileInput) fileInput.value = '';
    };

    const handleReset = (attribute) => {
        const resetFunctions = {
            taste: () => setTaste(0),
            ambiance: () => setAmbiance(0),
            foodComa: () => setFoodComa(0),
            service: () => setService(0),
            noise: () => setNoise(0),
            creativity: () => setCreativity(0),
            image: handleRemoveImage
        };

        if (resetFunctions[attribute]) resetFunctions[attribute]();
    };

    return {
        taste, setTaste,
        ambiance, setAmbiance,
        foodComa, setFoodComa,
        service, setService,
        noise, setNoise,
        creativity, setCreativity,
        image,
        comment, setComment,
        isLoading,
        error,
        getLocationName,
        saveRatings,
        handleImageChange,
        handleReset
    };
};

export default useFoodRating;
