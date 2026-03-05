import { api } from './api';

export const getOrCreateLocation = async (location) => {
    const lat = parseFloat(location.lat).toFixed(6);
    const lon = parseFloat(location.lon).toFixed(6);
    const name = location.display_name ? location.display_name.split(',')[0] : location.name;

    return api('/api/locations/find-or-create', {
        method: 'POST',
        body: JSON.stringify({
            name,
            type: location.type,
            lat,
            lon,
            address: location.address,
            ...(location.display_name ? { osm_data: location } : {})
        })
    });
};
