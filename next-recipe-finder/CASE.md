# Case Link:

- https://develops.notion.site/Front-end-JS-engineer-test-assessment-the-Recipe-Finder-App-5b87f1603ac54112bacfdc625a85a87b

# Front-end JS engineer test assessment - the Recipe Finder App

### Overview

This documentation outlines the steps to complete the test assessment for creating a **Recipe Finder Application** using Next.js. The application will allow users to search for recipes with advanced filters, display results on a separate page, and view detailed information for each recipe.

## Steps to Complete the Assessment

### 1. Create a Next.js Application

### 2. Create a Search Page

1. **Design the Search Page:**
   - It should be the home page of the app
   - Use Tailwind CSS to style the page.
   - You can design and style the components as you want
2. **Add a Search Form:**
   - Add an input field for users to enter a recipe **query** (e.g., "pasta").
   - Add a dropdown with **cuisine** options like "Italian," "Mexican," "Chinese," etc. (see a full [list of supported cuisines](https://spoonacular.com/food-api/docs#Cuisines); use at least three options)
   - Add a numeric input to specify the maximum **preparation time** in minutes.
3. **Enable the "Next" Button:**
   - Add a "Next" navigation button that is initially disabled.
   - Enable the button only when at least one of the three fields (query, cuisine, or preparation time) is filled in
4. **Navigate to the Recipes Page:**
   - On clicking the "Next", navigate to the `recipes` page with query parameters (query, cuisine, or preparation time) passed in the URL.

### 3. Create the Recipes Page

1. **Fetch Recipes Data on the Server**:
   - Implement server-side rendering (SSR).
   - Use the following API endpoint to retrieve recipes:
     ```jsx
     https://api.spoonacular.com/recipes/complexSearch?query={query}&cuisine={cuisine}&maxReadyTime={maxReadyTime}&apiKey=YOUR_API_KEY
     ```
     - To get an API key, sign up for a free Spoonacular account at [Spoonacular API](https://spoonacular.com/food-api/docs#Authentication)
   - Cache the API response for **1 minute**.
2. **Render Recipes:**
   - Display a list of recipes, including the title and image of each recipe using Tailwind CSS for styling.
   - Clicking on a recipe should navigate the user to the **Recipe Details Page** for that specific recipe (route `recipes/[id]`).
   - Implement error handling for any data fetching issues.

### 4. Create the Recipe Details Page

1. **Fetch Recipe Details:**
   - Use the following endpoint to fetch recipes:
     ```jsx
     https://api.spoonacular.com/recipes/<recipeId>/information?apiKey=YOUR_API_KEY
     ```
2. **Render Recipe Details:**
   - Display the following:
     - **Recipe title**
     - **List of ingredients**
   - Optionally, you can display other data from the endpoint(e.g., preparation time, number of servings, or a summary)

### 5. Implement Suspense Component

- Use React's `Suspense` component to handle loading states where applicable.
- Consider using `Suspense` for data fetching and component loading.

### 6. Implement UI with Tailwind CSS

- Ensure all components and pages are styled using Tailwind CSS.
- Follow best practices for responsive design and accessibility.

### 7. Add Configuration and Documentation

1. **Environment Variables:**
   - Create a `.env.local` file in the root directory to store environment variables. Add it to the repository.
2. **Setup ESLint and Prettier:**
   - Add ESLint and Prettier to maintain code quality and consistency.
   - Configure `.eslintrc.js` and `.prettierrc` files according to project standards.
3. **Create a README File:**
   - Include instructions on how to run and build the application.
   - Provide an overview of the application's features and architecture.

### Additional Resources

- **API Documentation:** [Spoonacular API Documentation](https://spoonacular.com/food-api/docs)
- **Next.js Documentation:** [Next.js Docs](https://nextjs.org/docs)
- **Tailwind CSS Documentation:** [Tailwind CSS Docs](https://tailwindcss.com/docs)
- **React Suspense Documentation:** [React Suspense](https://react.dev/reference/react/Suspense)
