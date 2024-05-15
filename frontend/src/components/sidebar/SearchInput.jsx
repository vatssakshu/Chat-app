import React from "react";
import { IoSearchSharp } from "react-icons/io5";
const SearchInput = () => {
  return (
    <form className="flex items-center gap-2 mt-3">
      <input
        type="text"
        placeholder="Search..."
        className="input input-border rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-cyan-700 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
