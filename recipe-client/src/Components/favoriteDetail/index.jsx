import React, {useState} from 'react'
import Card from '../common/card';
import {Link} from 'react-router-dom';
import './favoriteDetail.css';
import { MdFavorite } from 'react-icons/md';

const favoriteDetail = () => {
      const favoriteRecipe = JSON.parse(localStorage.getItem("favorites")) || [];
      console.log("favorite", favoriteRecipe)
    
    const handleRemoveFavorites = (id) => {
            const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            const updatedFavorites = favorites.filter((fav) => fav.idMeal !== id);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }
      return (
       <>
      
      <h1 className='text-black text-3xl font-bold text-center pt-4 header-bg h-[350px]'>Favorite Recipes</h1>
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
               <div className="flex items-center gap-3.5 mt-2 text-white bg-black rounded-3xl px-10 ">
                                 
                              <Link to={`/recipeDetail/${recipe.meal.idMeal}`}>
                                See Complete Recipe
                              </Link>
                              <MdFavorite className="w-[35px] h-[40px] justify-start text-red-500" onClick={() => handleRemoveFavorites(recipe.meal.idMeal)} /> 
                            
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