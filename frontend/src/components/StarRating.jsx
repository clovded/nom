import {useState} from "react";

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(null);
    const isInteractive = !!setRating;

    return (
        <div>
            <div>
                {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = star <= (hover || rating || 0);

                    return (
                        <button
                            type="button"
                            className="bg-transparent border-0 text-moss text-[1.8rem] px-[0.25rem] py-0"
                            key={star}
                            data-selected={isFilled}
                            onClick={() => {
                                if (isInteractive) {
                                    setRating(star);
                                }
                            }}
                            onMouseEnter={() => {
                                if (isInteractive) {
                                    setHover(star);
                                }
                            }}
                            onMouseLeave={() => {
                                if (isInteractive) {
                                    setHover(null);
                                }
                            }}
                            disabled={!isInteractive}
                        >
                            {isFilled ? "★" : "☆"}
                        </button>
                    )
                })}
            </div>
        </div>
    );
}

export default StarRating;
