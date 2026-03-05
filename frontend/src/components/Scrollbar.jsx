const Scrollbar = ({ children }) => {
    return (
        <div className="flex flex-row overflow-x-auto gap-[15px] pb-[10px]">
            {children}
        </div>
    )
}

export default Scrollbar;
