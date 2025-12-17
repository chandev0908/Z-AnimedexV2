"use client";
import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const HeadNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="@container sticky top-0 w-full h-16 bg-secondary font-sans flex items-center px-4 shadow-md z-100">
      <div className="content w-full max-w-7xl flex justify-between items-center mx-auto">
        <p className="text-xl font-bold">Z-Animedex</p>
        <form
          action=""
          className="hidden md:flex relative flex items-center relative"
        >
          <input
            type="text"
            placeholder="Search your favorite Anime"
            className="rounded-lg py-2 px-2 text-text-primary w-md font-sans text-sm focus:outline-none focus:ring-2 focus:ring-black bg-foreground [&::placeholder]:font-sans [&::placeholder]:text-text-primary"
          />
          <button
            className="cursor-pointer absolute top-50% right-2"
            type="submit"
          >
            <FaSearch className="text-background" />
          </button>
        </form>
        {/* Search Button */}
        <div className="md:hidden relative flex items-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="cursor-pointer absolute right-2"
          >
            <FaSearch className="text-text-secondary text-xl" />
          </button>
        </div>

        {/* Fullscreen Search Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setOpen(false)} // Close when clicking background
          >
            {/* Stop click from closing when clicking inside box */}
            <div
              className="bg-primary w-11/12 max-w-md p-4 rounded-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-0 right-0 text-gray-500 hover:text-black"
              >
                <FaTimes size={20} />
              </button>

              {/* Search input */}
              <input
                type="text"
                placeholder="Search your favorite Anime"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none bg-text-primary"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default HeadNav;
