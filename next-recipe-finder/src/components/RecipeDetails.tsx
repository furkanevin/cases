import Image from "next/image";
import {
  getRecipeDetails,
  type RecipeDetails,
  type Ingredient,
  type Instruction,
} from "@/services/recipe.service";
import Card from "@/components/ui/Card";
import { FiClock, FiUsers, FiHeart } from "react-icons/fi";

// Recipe stat display component
const RecipeStat = ({
  icon,
  label,
  value,
  bgColor = "bg-blue-50 dark:bg-gray-700",
  iconColor = "text-blue-500",
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  bgColor?: string;
  iconColor?: string;
}) => (
  <div className={`flex flex-col items-center p-4 ${bgColor} rounded-xl`}>
    <div className={`${iconColor} mb-2`}>{icon}</div>
    <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
      {value}
    </span>
  </div>
);

// Ingredient item component
const IngredientItem = ({ ingredient }: { ingredient: Ingredient }) => (
  <li className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
    <div className="h-10 w-10 bg-white dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
      <Image
        src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
        alt={ingredient.name}
        width={30}
        height={30}
        className="rounded-full"
      />
    </div>
    <span className="text-gray-700 dark:text-gray-300">
      {ingredient.original}
    </span>
  </li>
);

// Instruction step component
const InstructionStep = ({
  step,
}: {
  step: { number: number; step: string };
}) => (
  <li className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
    <div className="flex items-start">
      <span className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-bold rounded-full h-7 w-7 flex items-center justify-center mr-3">
        {step.number}
      </span>
      <span className="text-gray-700 dark:text-gray-300">{step.step}</span>
    </div>
  </li>
);

// Section header component
const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
    {title}
  </h2>
);

// Component to display recipe details
export default async function RecipeDetailsComponent({ id }: { id: string }) {
  // Fetch recipe details using the service function
  const recipe: RecipeDetails = await getRecipeDetails(id);

  const imageContainer = (
    <>
      <Image
        src={recipe.image}
        alt={recipe.title}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {recipe.title}
        </h1>
        <div className="flex flex-wrap gap-2 mt-4">
          {recipe.dishTypes.map((type, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-500/80 text-white text-sm font-medium rounded-full"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  const cardContent = (
    <div className="p-6 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <RecipeStat
          icon={<FiClock className="h-8 w-8" />}
          label="Ready in"
          value={`${recipe.readyInMinutes} min`}
        />
        <RecipeStat
          icon={<FiUsers className="h-8 w-8" />}
          label="Servings"
          value={recipe.servings}
          bgColor="bg-green-50 dark:bg-gray-700"
          iconColor="text-green-500"
        />
        <RecipeStat
          icon={<FiHeart className="h-8 w-8" />}
          label="Health Score"
          value={recipe.healthScore}
          bgColor="bg-yellow-50 dark:bg-gray-700"
          iconColor="text-yellow-500"
        />
      </div>

      <div className="mb-10">
        <SectionHeader title="About this recipe" />
        <div
          className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        ></div>
      </div>

      <div className="mb-10">
        <SectionHeader title="Ingredients" />
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {recipe.extendedIngredients.map((ingredient, index) => (
            <IngredientItem key={index} ingredient={ingredient} />
          ))}
        </ul>
      </div>

      <div>
        <SectionHeader title="Instructions" />
        {recipe.analyzedInstructions.length > 0 ? (
          <div>
            {recipe.analyzedInstructions.map((instruction, index) => (
              <div key={index} className="mb-6">
                {instruction.name && (
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {instruction.name}
                  </h3>
                )}
                <ol className="space-y-4">
                  {instruction.steps.map((step, stepIndex) => (
                    <InstructionStep key={stepIndex} step={step} />
                  ))}
                </ol>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No detailed instructions available for this recipe.
          </p>
        )}
      </div>
    </div>
  );

  return (
    <Card className="overflow-hidden" imageContainer={imageContainer}>
      {cardContent}
    </Card>
  );
}
