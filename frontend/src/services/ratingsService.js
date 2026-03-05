import { pb } from './pocketbase';

export const getOrCreateLocation = async (location) => {
    const lat = parseFloat(location.lat || location.lat).toFixed(6);
    const lon = parseFloat(location.lon || location.lon).toFixed(6);
    const name = location.display_name ? location.display_name.split(',')[0] : location.name;

    try {
        const existingByCoords = await pb.collection('locations').getFirstListItem(
            `lat ~ "${lat}" && lon ~ "${lon}"`
        );

        if (existingByCoords.name === name) {
            return existingByCoords;
        } else {
            return await createNewLocation(location, lat, lon, name);
        }
    } catch (error) {
        return await createNewLocation(location, lat, lon, name);
    }
};

const createNewLocation = async (location, lat, lon, name) => {
    const locationData = {
        name: name,
        type: location.type,
        lat: lat,
        lon: lon,
        address: location.address
    };

    if (location.display_name) {
        locationData.osm_data = location;
    }

    return await pb.collection('locations').create(locationData);
};
