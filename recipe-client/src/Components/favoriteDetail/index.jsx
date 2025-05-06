import React from 'react'
import Card from '../common/card';
import {Link} from 'react-router-dom';

const favoriteDetail = () => {
      const favoriteRecipe = JSON.parse(localStorage.getItem("favorites")) || [];
      console.log("favorite", favoriteRecipe)
      return (
       <>
      
      <h1 className='text-black text-3xl font-bold  text-center pt-4'>Favorite Recipes</h1>
      <div className="flex flex-wrap justify-center gap-6 p-6 ">
            {favoriteRecipe.length > 0 ? (
                  favoriteRecipe.map((recipe,index) => 
               {
                  return(
                  <>
                   <div
                key={`${index}`}
                className="w-full sm:w-[48%] md:w-[30%] bg-gray-100 rounded-lg p-4 shadow-lg flex flex-col items-center"
              >
                <h2 className="font-bold text-lg mb-2 text-center">
                  {recipe.meal.strMeal}
                </h2>
                <img
                  src={recipe.meal.strMealThumb}
                  alt={recipe.meal.strMeal}
                  className="rounded-lg w-11/12 h-3/6 mb-4 shadow-shdw"
                />
                <p className="text-sm mb-2 pt-5 h-[200px] line-clamp-3 overflow-y-scroll">
                  {recipe.meal.strInstructions}
                </p>
                <div className="flex gap-24 mt-2 text-red-500">
                  {/* { existFavorites(recipe.meal.idMeal) ? <MdFavorite className="w-[35px] h-[40px]" onClick={() => handleFavorites(recipe.meal.idMeal, recipe.meal)}/> : <MdFavoriteBorder className="w-[35px] h-[40px]" title="Add to favorites" onClick={() => handleFavorites(recipe.meal.idMeal,recipe.meal)} />} */}
                  <button className="bg-red-500 text-black px-2 py-1 rounded hover:bg-purple-400">
                    <Link to={`/recipeDetail/${recipe.meal.idMeal}`} className="text-black hover:underline">
                      View Recipe
                    </Link>
                  </button>
                  
                </div>
              </div>
                  </>
               )}
            )
            ) : (
               <div className="text-black text-center">No favorite recipes found.</div>
            )}
      </div>
       </>
      )
}

export default favoriteDetail