"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <form
      action={"/search"}
      className="w-[90%] max-w-sm md:max-w-3xl mx-auto relative z-20 group"
    >
      <div className="relative flex items-center w-full">
        <input
          type="text"
          name="query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your favorite Anime..."
          className="w-full px-6 py-4 rounded-full text-center text-lg md:text-xl font-sans focus:outline-none focus:ring-2 focus:ring-white/60 bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 placeholder:text-white/80 placeholder:font-sans text-white hover:bg-white/20 focus:bg-white/20"
        />
        <button
          className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full hover:bg-white/20 transition-colors"
          type="submit"
        >
          <FaSearch className="text-xl md:text-2xl text-white" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
