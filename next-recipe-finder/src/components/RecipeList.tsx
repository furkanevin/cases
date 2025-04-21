import Link from "next/link";
import Image from "next/image";
import {
  searchRecipes,
  formatSearchSummary,
  type RecipesResponse,
} from "@/services/recipe.service";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import BackButton from "@/components/ui/BackButton";
import {
  FiAlertTriangle,
  FiArrowRight,
  FiArrowLeft,
  FiRefreshCw,
} from "react-icons/fi";

interface RecipeListProps {
  query?: string;
  cuisine?: string;
  maxReadyTime?: string;
}

// No results found component
const NoRecipesFound = () => (
  <div className="text-center py-16 px-4">
    <div className="inline-flex rounded-full bg-yellow-100 p-6 mb-6">
      <FiAlertTriangle className="h-12 w-12 text-yellow-600" />
    </div>
    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
      No recipes found
    </h2>
    <p className="mb-8 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
      Try adjusting your search criteria or use different ingredients.
    </p>
    <BackButton />
  </div>
);

// Recipe card component
const RecipeCard = ({
  recipe,
}: {
  recipe: { id: number; title: string; image: string };
}) => {
  const imageContent = (
    <>
      <Image
        src={recipe.image}
        alt={recipe.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </>
  );

  const footerContent = (
    <>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        View details
      </span>
      <span className="text-blue-600 dark:text-blue-400">
        <FiArrowRight className="h-5 w-5" />
      </span>
    </>
  );

  return (
    <Link href={`/recipes/${recipe.id}`} className="group flex flex-col h-full">
      <Card
        interactive
        className="h-full flex flex-col"
        imageContainer={imageContent}
        title={recipe.title}
        footer={footerContent}
      />
    </Link>
  );
};

// Search header component
const SearchHeader = ({
  searchSummary,
  totalResults,
}: {
  searchSummary: string;
  totalResults: number;
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8">
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Search results for
        </p>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {searchSummary}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Found {totalResults} recipe{totalResults !== 1 ? "s" : ""}
        </p>
      </div>
      <Button href=".." variant="secondary">
        <FiRefreshCw className="mr-2 h-4 w-4" />
        New Search
      </Button>
    </div>
  </div>
);

// Server component to fetch and display recipes
export default async function RecipeList({
  query,
  cuisine,
  maxReadyTime,
}: RecipeListProps) {
  // Convert maxReadyTime to number if provided
  const maxTime = maxReadyTime ? parseInt(maxReadyTime, 10) : undefined;

  // Fetch recipes using the service function
  const data: RecipesResponse = await searchRecipes({
    query,
    cuisine,
    maxReadyTime: maxTime,
  });

  if (data.results.length === 0) {
    return <NoRecipesFound />;
  }

  // Get formatted search summary
  const searchSummary = formatSearchSummary({
    query,
    cuisine,
    maxReadyTime: maxTime,
  });

  return (
    <div>
      <SearchHeader
        searchSummary={searchSummary}
        totalResults={data.totalResults}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.results.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
