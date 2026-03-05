import { useAuth } from "../auth/AuthContext";
import StarRating from "../../components/StarRating";
import VolumeBar from "../../components/VolumeBar";
import useFoodRating from "./hooks/useFoodRating";

const FoodRating = ({ location, onClose }) => {
    const { currentUser } = useAuth();

    const {
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
    } = useFoodRating({ location, currentUser, onClose });

    if (!location) return <div>Loading location data...</div>;
    if (!currentUser) return <div>you need to be logged in</div>;

    return (
        <div className="bg-clay p-8 rounded-lg border-2 border-dark-grey max-w-[500px] mx-auto">
            {error && <div className="bg-[darkred] text-white p-[0.8rem] rounded mb-4 text-center font-bold">{error}</div>}
            <h2 className="text-coffee mt-0 mb-4 text-[1.8rem] text-center">{getLocationName()}</h2>
            <div className="text-center text-coffee mb-4 text-[0.8rem] italic">
                Rate from 1-5! (Leave it 0 if you can't rate the specific attribute)
            </div>

            {[
                { label: 'Taste', value: taste, setter: setTaste, key: 'taste' },
                { label: 'Ambiance', value: ambiance, setter: setAmbiance, key: 'ambiance' },
                { label: 'Food Coma', value: foodComa, setter: setFoodComa, key: 'foodComa' },
                { label: 'Service', value: service, setter: setService, key: 'service' },
                { label: 'Creativity', value: creativity, setter: setCreativity, key: 'creativity' },
            ].map(({ label, value, setter, key }) => (
                <div key={key} className="flex justify-between items-center py-[0.5rem] border-b border-dotted border-dark-grey mb-[0.25rem]">
                    <span className="font-bold uppercase text-coffee text-[0.8rem] min-w-[100px]">{label}</span>
                    <div className="flex items-center gap-[0.8rem]">
                        <StarRating rating={value} setRating={setter} />
                        <button
                            className="bg-coffee text-clay border border-coffee rounded px-[0.5rem] py-[0.25rem] text-[0.7rem] transition-all duration-200 uppercase font-bold disabled:bg-beige-light disabled:text-dark-grey disabled:border-beige-light"
                            onClick={() => handleReset(key)}
                            disabled={value === 0}
                        >
                            clear
                        </button>
                    </div>
                </div>
            ))}

            <div className="flex justify-between items-center py-[0.5rem] border-b border-dotted border-dark-grey mb-[0.25rem]">
                <span className="font-bold uppercase text-coffee text-[0.8rem] min-w-[100px]">Noise Level</span>
                <div className="flex flex-col gap-[0.5rem] w-[35%] items-end">
                    <VolumeBar volume={noise} setVolume={setNoise} max={5} step={0.5} />
                    <button
                        className="bg-coffee text-clay border border-coffee rounded px-[0.5rem] py-[0.25rem] text-[0.7rem] transition-all duration-200 uppercase font-bold disabled:bg-beige-light disabled:text-dark-grey disabled:border-beige-light self-end mt-[0.25rem]"
                        onClick={() => handleReset('noise')}
                        disabled={noise === 0}
                    >
                        clear
                    </button>
                </div>
            </div>

            <div>
                <div className="mt-4 mb-4 p-[0.8rem] bg-cream border-2 border-dashed border-dark-grey rounded text-center transition-all duration-300 hover:bg-beige-light hover:border-coffee">
                    <input type="file" multiple onChange={handleImageChange} id="image-upload" accept="image/*" />
                </div>

                {image.length > 0 && (
                    <div className="flex items-center gap-2">
                        <div>{image.length} {image.length === 1 ? 'photo' : 'photos'} selected</div>
                        <button
                            className="bg-coffee text-clay border border-coffee rounded px-[0.5rem] py-[0.25rem] text-[0.7rem] transition-all duration-200 uppercase font-bold disabled:bg-beige-light disabled:text-dark-grey disabled:border-beige-light"
                            onClick={() => handleReset('image')}
                            disabled={image.length === 0}
                        >
                            clear
                        </button>
                    </div>
                )}

                <div>
                    <textarea
                        id="comment"
                        className="max-w-[98%] min-w-[98%]"
                        rows="3"
                        cols="82"
                        placeholder="additional thoughts?"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
            </div>

            <button
                className="w-full bg-moss text-white border-0 rounded p-[0.8rem] text-[0.9rem] font-bold uppercase transition-all duration-300 mt-4 [&:not(:disabled):hover]:-translate-y-[2px] disabled:bg-dark-grey"
                onClick={saveRatings}
                disabled={isLoading}
            >
                {isLoading ? 'saving...' : 'save ratings'}
            </button>
        </div>
    );
};

export default FoodRating;
