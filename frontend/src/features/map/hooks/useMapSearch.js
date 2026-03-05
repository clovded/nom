import { useEffect, useRef, useState } from 'react';
import { getOrCreateLocation } from '../../../services/ratingsService';
import { VALID_TYPES } from '../constants';

const useMapSearch = () => {
    const mapRef = useRef(null);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);
    const [showRatingComponent, setShowRatingComponent] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [showRatingsList, setShowRatingsList] = useState(false);

    useEffect(() => {
        if (selectedResult && mapRef.current) {
            const lat = parseFloat(selectedResult.lat);
            const lon = parseFloat(selectedResult.lon);
            mapRef.current.flyTo([lat, lon], 16, {
                duration: 2,
                easeLinearity: 1
            });
        }
    }, [selectedResult]);

    const handleSearch = async (searchValue) => {
        console.log("search value:", searchValue);

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=jsonv2&q=
                ${encodeURIComponent(searchValue)}&viewbox=13.0,52.6,13.8,52.3&bounded=1&addressdetails=1`
            );

            const data = await response.json();
            const filteredData = data.filter(location => VALID_TYPES.includes(location.type));
            setSearchResults(filteredData);
            console.log("api-response:", JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("error searching for spots", error);
        }
    };

    const handleResultClick = (result) => {
        setSelectedResult(result);
        setShowRatingComponent(false);
        setShowRatingsList(false);
    };

    const handleRatingButtonClick = async (location) => {
        try {
            const locationRecord = await getOrCreateLocation(location);
            setCurrentLocation(locationRecord);
            setShowRatingComponent(true);
            setShowRatingsList(false);
        } catch (error) {
            console.error('Error handling location:', error);
        }
    };

    const handleShowRatings = async (location) => {
        try {
            const locationRecord = await getOrCreateLocation(location);
            setCurrentLocation(locationRecord);
            setShowRatingsList(true);
            setShowRatingComponent(false);
        } catch (error) {
            console.error('Error handling location:', error);
        }
    };

    return {
        mapRef,
        searchResults,
        currentLocation,
        showRatingComponent,
        showRatingsList,
        setShowRatingComponent,
        handleSearch,
        handleResultClick,
        handleRatingButtonClick,
        handleShowRatings
    };
};

export default useMapSearch;
