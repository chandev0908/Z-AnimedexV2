"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="w-90 max-w-sm md:w-full md:max-w-3xl mx-auto">
      <div className="relative flex items-center relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your favorite Anime"
          className="w-full text-black px-4 py-3 rounded-lg text-center text-xl font-sans focus:outline-none focus:ring-2 focus:ring-black bg-white [&::placeholder]:text-center [&::placeholder]:font-sans [&::placeholder]:text-black"
        />
        <button
          className="cursor-pointer absolute top-50% right-3"
          type="submit"
        >
          <FaSearch className="text-2xl text-black" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
