const VolumeBar = ({ volume, setVolume, max = 5, step = 1 }) => {
    const percentage = (volume / max) * 100;

    const handleChange = (e) => {
        setVolume(parseFloat(e.target.value));
    };

    return (
        <div className="flex flex-col gap-[0.25rem] w-full">
            <div className="flex items-center gap-[0.5rem] mb-[0.25rem]">
                <span className="font-bold text-coffee text-[0.8rem]">{volume.toFixed(1)}</span>
            </div>

            <input
                type="range"
                min="0"
                max={max}
                step={step}
                value={volume}
                onChange={handleChange}
                className="volume-slider w-full h-2 rounded-full outline-none appearance-none bg-beige-light"
                style={{
                    background: `linear-gradient(to right, #8A9B6E 0%, #8A9B6E ${percentage}%, #e0dcd3 ${percentage}%, #e0dcd3 100%)`
                }}
            />

            <div className="flex justify-between text-[0.7rem] text-dark-grey mt-[0.25rem]">
                <span>quiet</span>
                <span>moderate</span>
                <span>loud</span>
            </div>
        </div>
    );
};

export default VolumeBar;
