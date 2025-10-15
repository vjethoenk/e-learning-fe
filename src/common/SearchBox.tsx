import React, { useState } from "react";

interface SearchBoxProps {
  placeholder?: string;
  onSearch: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = "Search...",
  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue.trim());
  };

  return (
    <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
      <form className="lg:pr-3 w-full" onSubmit={handleSubmit}>
        <label htmlFor="users-search" className="sr-only">
          Search
        </label>
        <div className="mt-1 relative lg:w-64 xl:w-96">
          <input
            type="text"
            id="users-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                       focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder={placeholder}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
