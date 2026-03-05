import useRatings from './hooks/useRatings';
import StarRating from "../../components/StarRating";
import VolumeBar from "../../components/VolumeBar";

const RatingList = ({location}) => {
    const {ratings: allRatings, loading, error} = useRatings();
    const locationRatings = allRatings.filter(rating =>
        rating.location === location.id || rating.expand?.location?.id === location.id
    );

    if (loading) return <div>Loading ratings...</div>;
    if (error) return <div>Error: {error}</div>;
    if (locationRatings.length === 0) return <div>No ratings found</div>;

    return (
        <div className="bg-clay p-8 rounded-lg border-2 border-dark-grey">
            <h2 className="text-coffee mt-0 mb-[1.5rem] text-[1.8rem] text-center">{location.name}</h2>
            <div className="flex flex-wrap gap-[1.5rem] justify-center">
                {locationRatings.map((rating) => (
                    <div key={rating.id} className="rating-card-grid p-[1.2rem] bg-cream rounded-[2px] max-w-[280px] text-[0.85rem] shadow-card relative border border-beige-light transition-all duration-300 hover:shadow-hover hover:-translate-y-[2px]">

                        <div className="flex justify-between items-center border-b border-dashed border-dark-grey mb-[0.8rem] pb-[0.5rem]">
                            <div className="font-bold uppercase text-coffee text-[0.75rem]">RATING RECEIPT</div>
                            <div className="text-dark-grey text-[0.7rem]">No. {rating.id.slice(-4)}</div>
                        </div>

                        <div className="text-center text-coffee mb-4 text-[0.8rem]">
                            {new Date(rating.created).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                weekday: 'short'
                            })}
                        </div>

                        <div className="grid gap-[0.5rem] mb-4">
                            <div className="flex justify-between items-center py-[0.25rem] border-b border-dotted border-dark-grey">
                                <span className="font-bold uppercase text-coffee text-[0.8rem]">Taste:</span>
                                <span className="flex">
                                    <StarRating rating={rating.taste}/>
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-[0.25rem] border-b border-dotted border-dark-grey">
                                <span className="font-bold uppercase text-coffee text-[0.8rem]">Ambiance:</span>
                                <span className="flex">
                                    <StarRating rating={rating.ambiance}/>
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-[0.25rem] border-b border-dotted border-dark-grey">
                                <span className="font-bold uppercase text-coffee text-[0.8rem]">Food Coma:</span>
                                <span className="flex">
                                    <StarRating rating={rating.foodComa}/>
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-[0.25rem] border-b border-dotted border-dark-grey">
                                <span className="font-bold uppercase text-coffee text-[0.8rem]">Service:</span>
                                <span className="flex">
                                    <StarRating rating={rating.service}/>
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-[0.25rem] border-b border-dotted border-dark-grey">
                                <span className="font-bold uppercase text-coffee text-[0.8rem]">Creativity:</span>
                                <span className="flex">
                                    <StarRating rating={rating.creativity}/>
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-[0.25rem] border-b border-dotted border-dark-grey">
                                <span className="font-bold uppercase text-coffee text-[0.8rem]">Noise Level:</span>
                                <VolumeBar
                                    volume={rating.noise}
                                    max={5}
                                    step={0.5}
                                />
                            </div>
                            <div className="flex justify-between items-center py-[0.25rem] border-b border-dotted border-dark-grey">
                                <span className="font-bold uppercase text-coffee text-[0.8rem]">Comment:</span>
                                <span>{rating.comment}</span>
                            </div>
                        </div>

                        <div className="flex justify-between border-t border-dashed border-dark-grey mt-4 pt-[0.5rem] text-[0.8rem]">
                            <div className="text-coffee">
                                by {rating.expand?.user?.username || 'unknown'}
                            </div>
                            <div className="text-dark-grey">
                                {new Date(rating.created).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                        </div>

                        <div className="text-center text-dark-grey border-t border-dashed border-dark-grey mt-[0.8rem] pt-[0.25rem] tracking-[2px] text-[0.7rem]">
                            ・　・　・　・　・　・　・　・　・　・　・
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingList;
