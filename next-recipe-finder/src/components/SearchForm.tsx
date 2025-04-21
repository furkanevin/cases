"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { FiSearch, FiGlobe, FiClock, FiChevronDown } from "react-icons/fi";

// Array of cuisine options from Spoonacular API
const CUISINE_OPTIONS = [
  "African",
  "Asian",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

export default function SearchForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    query: "",
    cuisine: "",
    maxReadyTime: "" as number | "",
  });
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  // Enable the "Next" button if at least one field is filled
  useEffect(() => {
    const { query, cuisine, maxReadyTime } = formData;
    setIsNextEnabled(
      query.trim() !== "" ||
        cuisine !== "" ||
        (typeof maxReadyTime === "number" && maxReadyTime > 0)
    );
  }, [formData]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    if (id === "time") {
      setFormData({
        ...formData,
        maxReadyTime: value === "" ? "" : parseInt(value, 10),
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  // Handle form submission
  const handleSearch = () => {
    const { query, cuisine, maxReadyTime } = formData;

    // Construct query parameters
    const params = new URLSearchParams();

    if (query.trim()) {
      params.append("query", query.trim());
    }

    if (cuisine) {
      params.append("cuisine", cuisine);
    }

    if (typeof maxReadyTime === "number" && maxReadyTime > 0) {
      params.append("maxReadyTime", maxReadyTime.toString());
    }

    // Navigate to recipes page with search parameters
    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <Card className="w-full max-w-lg p-8 transition-all duration-300 hover:shadow-2xl relative z-10">
      <div className="mb-6">
        <label
          htmlFor="query"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          What would you like to cook?
        </label>
        <div className="relative">
          <input
            id="query"
            type="text"
            placeholder="Enter ingredients or dish name (e.g., pasta)"
            className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
            value={formData.query}
            onChange={handleInputChange}
          />
          <span className="absolute left-3 top-3.5 text-gray-400">
            <FiSearch className="h-5 w-5" />
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label
          htmlFor="cuisine"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Cuisine Type
        </label>
        <div className="relative">
          <select
            id="cuisine"
            className="w-full p-3 pl-10 appearance-none border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
            value={formData.cuisine}
            onChange={handleInputChange}
          >
            <option value="">Select cuisine</option>
            {CUISINE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="absolute left-3 top-3.5 text-gray-400">
            <FiGlobe className="h-5 w-5" />
          </span>
          <span className="absolute right-3 top-3.5 pointer-events-none text-gray-400">
            <FiChevronDown className="h-5 w-5" />
          </span>
        </div>
      </div>

      <div className="mb-8">
        <label
          htmlFor="time"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Maximum Preparation Time
        </label>
        <div className="relative">
          <input
            id="time"
            type="number"
            min="1"
            placeholder="Enter minutes"
            className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
            value={formData.maxReadyTime}
            onChange={handleInputChange}
          />
          <span className="absolute left-3 top-3.5 text-gray-400">
            <FiClock className="h-5 w-5" />
          </span>
        </div>
      </div>

      <Button
        onClick={handleSearch}
        disabled={!isNextEnabled}
        className="w-full"
        variant={isNextEnabled ? "primary" : undefined}
      >
        Find Recipes
      </Button>
    </Card>
  );
}
