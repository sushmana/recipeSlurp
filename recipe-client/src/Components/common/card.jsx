import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import './card.css'
import {PacmanLoader} from 'react-spinners';

const Card = () => {
  const recipes = useSelector((state) => state.recipeReducer.recipeData);
  const isLoading = useSelector((state) => state.recipeReducer.isLoading);
  const dispatch = useDispatch();
  console.log("isLoading", isLoading);
  return (
    <>
    {isLoading && 
    (<>
    <div className="spinner"/>
     {/* <PacmanLoader size={150} color="#36d7b7" loading={isLoading} /> */}
    </>
    )}
    <div className="flex flex-wrap justify-center gap-6 p-6 bg-black rounded-lg shadow-md">
    {recipes.length > 0 &&
          !isLoading &&
          recipes.map((data, index) => {
            // Ensure data.meals exists and is an array
            if (!data?.meals || !Array.isArray(data.meals)) {
              return (<h3 className="text-2xl text-pink-700">No Recipes Found</h3>);
            }

            return data.meals.map((meal, mealIndex) => (
              <div
                key={`${index}-${mealIndex}`}
                className="w-full sm:w-[48%] md:w-[30%] bg-gray-100 rounded-lg p-4 shadow-lg flex flex-col items-center"
              >
                <h2 className="font-bold text-lg mb-2 text-center">
                  {meal.strMeal}
                </h2>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="rounded-lg w-11/12 h-3/6 mb-4 shadow-shdw"
                />
                <p className="text-sm mb-2 pt-5 pb-40 line-clamp-3 overflow-y-scroll">
                  {meal.strInstructions}
                </p>
                <div className="flex gap-2 mt-2 text-red-500">
                  <MdFavoriteBorder />
                  <MdFavorite />
                </div>
              </div>
            ));
          })}
      </div>
    </>
  );
};

export default Card;
