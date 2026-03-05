const SearchField = ({onSearch}) => {

    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchValue = formData.get("search");
        onSearch(searchValue);
    }

    return (
        <form onSubmit={handleSearch}>
            <input
                className="px-4 py-3 border-2 border-blue rounded-[12px] bg-clay text-base text-[#111827] transition-all duration-200 focus:border-green focus:-translate-y-[3px] focus:outline-none"
                type="text"
                placeholder="search..."
                name="search"
            />
        </form>
    );
};

export default SearchField;
