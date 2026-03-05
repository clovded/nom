import { useState } from 'react';
import { pb } from '../../../services/pocketbase';
import { getOrCreateLocation } from '../../../services/ratingsService';

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
            console.log('Using location:', locationRecord);

            const record = await pb.collection('ratings').create({
                location: locationRecord.id,
                user: currentUser.id,
                taste: taste || 0,
                ambiance: ambiance || 0,
                foodComa: foodComa || 0,
                service: service || 0,
                noise: noise || 0,
                creativity: creativity || 0,
                image,
                comment: comment || ''
            });

            console.log('saved rating data', record);
            alert('Rating saved successfully');
            onClose();
        } catch (error) {
            console.error('error saving rating:', error);
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
