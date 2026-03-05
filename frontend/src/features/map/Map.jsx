import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import SearchField from "./SearchField";
import Scrollbar from "../../components/Scrollbar";
import FoodRating from "../ratings/FoodRating";
import RatingList from "../ratings/RatingList";
import useMapSearch from "./hooks/useMapSearch";
import { ICON_MAPPING } from "./constants";

const Map = () => {
    const {
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
    } = useMapSearch();

    const formatLocation = (location) => {
        if (!location.display_name) return "unknown location";

        const typeIcon = ICON_MAPPING[location.type] || "❓";
        const {
            road: street,
            house_number: number,
            suburb: district,
            city,
            postcode: zip
        } = location.address || {};

        const name = location.display_name.split(',')[0];

        return (
            <div className="flex flex-col">
                <div className="flex items-center mb-3 gap-[10px] pb-[10px] border-b border-dark-grey">
                    <span className="text-2xl p-2 bg-grey rounded-full border-2 border-dark-grey">{typeIcon}</span>
                    <span className="font-bold text-base text-[#2c3e50]">{name}</span>
                </div>

                <div className="flex flex-col gap-1">
                    {street && number && (
                        <div className="flex text-[0.95rem] text-black">{street} {number}</div>
                    )}
                    {district && (
                        <div className="flex text-[0.95rem] text-black">{district}</div>
                    )}
                    {city && zip && (
                        <div className="flex text-[0.95rem] text-black">{city} {zip}</div>
                    )}
                </div>

                <button
                    className="w-[40%] self-end border-2 border-dark-grey rounded-[12px] bg-clay mt-1 hover:bg-green"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRatingButtonClick(location);
                        console.log("rate location:", location);
                    }}
                >
                    rate me!
                </button>

                <button
                    className="w-[40%] self-end border-2 border-dark-grey rounded-[12px] bg-clay mt-1 hover:bg-green"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleShowRatings(location);
                    }}
                >
                    show ratings!
                </button>
            </div>
        );
    };

    const createCustomIcon = (type) => {
        const icon = ICON_MAPPING[type] || "❓";
        return L.divIcon({
            html: `<div>${icon}</div>`,
            className: 'location-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
        });
    };

    return (
        <div>
            <SearchField onSearch={handleSearch} />

            <div className="mb-6">
                {searchResults.length > 0 && (
                    <div>
                        <Scrollbar>
                            {searchResults.map((result) => (
                                <div
                                    key={result.place_id}
                                    onClick={() => handleResultClick(result)}
                                    className="flex-[0_0_auto] w-[200px] p-4 my-4 border-2 border-dark-grey rounded-[12px] bg-clay transition-all duration-300 hover:border-beige hover:-translate-y-[3px]"
                                >
                                    {formatLocation(result)}
                                </div>
                            ))}
                        </Scrollbar>
                        {showRatingsList && (
                            <RatingList location={currentLocation} />
                        )}
                        {showRatingComponent && (
                            <FoodRating
                                location={currentLocation}
                                onClose={() => {
                                    console.log("closing component for: ", currentLocation);
                                    setShowRatingComponent(false);
                                }}
                            />
                        )}
                    </div>
                )}
            </div>

            <MapContainer
                center={[52.5200, 13.4050]}
                zoom={13}
                style={{ height: '500px', width: '100%' }}
                ref={mapRef}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {searchResults.map((result) => (
                    <Marker
                        key={result.place_id}
                        position={[parseFloat(result.lat), parseFloat(result.lon)]}
                        icon={createCustomIcon(result.type)}
                    >
                        <Popup>{formatLocation(result)}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;
