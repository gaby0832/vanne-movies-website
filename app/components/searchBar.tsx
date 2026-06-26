"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!search.trim()) return;

    router.push(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <label className="flex gap-4 w-100 h-10 bg-[#0E0E0E] rounded-md">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        className="text-sm w-full h-full bg-transparent px-3 outline-none"
        placeholder="Buscar..."
      />

      <button
        type="button"
        onClick={handleSearch}
        className="h-full px-3 flex justify-center items-center cursor-pointer"
      >
        <Search color="#4A4A4A" size={20} />
      </button>
    </label>
  );
}