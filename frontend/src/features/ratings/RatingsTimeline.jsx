import useRatings from "./hooks/useRatings";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const RatingTimeline = () => {
    const { ratings, loading, error } = useRatings();

    if (loading) return <div>Loading timeline...</div>;
    if (error) return <div>Error: {error}</div>;
    if (ratings.length === 0) return <div>No ratings found</div>;

    const groupedRatings = ratings.reduce((groups, rating) => {
        const date = new Date(rating.createdAt);
        const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });

        if (!groups[monthYear]) {
            groups[monthYear] = [];
        }
        groups[monthYear].push(rating);
        return groups;
    }, {});

    return (
        <div>
            {Object.entries(groupedRatings).map(([monthYear, monthRatings]) => (
                <div key={monthYear}>
                    <h2>{monthYear}</h2>
                    {monthRatings.map((rating) => (
                        <div key={rating._id}>
                            <div className="flex gap-[5px]">
                                <span>{rating.location?.name || 'Unknown Location'}</span>
                                <span>{new Date(rating.createdAt).toLocaleDateString()}</span>
                                <span>by {rating.user?.username || 'unknown'}</span>
                            </div>
                            <div className="grid gap-[0.5rem] mb-4">
                                <div>Taste: {rating.taste || 'N/A'}</div>
                                <div>Ambiance: {rating.ambiance || 'N/A'}</div>
                                <div>Food Coma: {rating.foodComa || 'N/A'}</div>
                                <div>Service: {rating.service || 'N/A'}</div>
                                <div>Creativity: {rating.creativity || 'N/A'}</div>
                                <div>Noise: {rating.noise || 'N/A'}</div>
                                <div className="flex flex-wrap gap-2">
                                    {rating.images?.map((img, index) => (
                                        <img
                                            key={index}
                                            src={`${API_URL}/uploads/${img}`}
                                            alt={`Rating ${index + 1}`}
                                            className="max-w-full h-auto w-[300px]"
                                        />
                                    ))}
                                </div>
                                <span>Comment: {rating.comment ? rating.comment : 'No comments'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default RatingTimeline;
