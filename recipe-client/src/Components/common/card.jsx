import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import './card.css'
import {PacmanLoader, DotLoader } from 'react-spinners';
import { useTranslation } from "react-i18next";
import {Link}  from "react-router-dom";
import {getRecipesDetail, getAllRecipe} from '../../redux/slices/recipes'
import loader from 'src/asset/images/loader.gif'


const Card = (props) => {
  const { t } = useTranslation();

  const recipes = useSelector((state) => state.recipeReducer.recipeData);
   const isLoading = useSelector((state) => state.recipeReducer.isLoading);
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    console.log("soter", storedFavorites)
  },[]);
  const existFavorites = (id) => {

    const isFavorite = favorites.filter((fav) => fav.idMeal === id);

    return isFavorite.length > 0;  
  };
    
  const handleFavorites = (id, meal) => {
    console.log(id)
    console.log(meal)
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorite = favorites.filter((fav) => fav.idMeal === id);

     if(isFavorite.length > 0) {
      const updatedFavorites = favorites.filter((fav) => fav.idMeal !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      console.log("Removed from favorites:", id);
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, { idMeal: id, meal:meal }];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      console.log("Added to favorites:", id);
      setFavorites(updatedFavorites);
    }  
  };
    
  return (
    <>
    {isLoading && 
    (<>
    {/* <div className="spinner"/> */}
    <div className="flex justify-center items-center ">
      <img src={loader} alt="loader"  style={{width:'70vh'}} className={'img-fluid'} />
     {/*<PacmanLoader size={50} color="gray" loading={isLoading} />*/}
    </div>
    </>
    )}
    <div className="flex flex-wrap justify-center gap-6 p-6 rounded-lg shadow-md">
    {recipes.length > 0 &&
          !isLoading &&
          recipes.map((data, index) => {
            // Ensure data.meals exists and is an array
            if (!data?.meals || !Array.isArray(data.meals)) {
              return (<h3 className="text-2xl text-pink-700">No Recipe Found</h3>);
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
                <p className="text-sm mb-2 pt-5 h-[200px] line-clamp-3 overflow-y-scroll">
                  {meal.strInstructions}
                </p>
                <div className="flex items-center gap-3.5 mt-2 text-white bg-black rounded-3xl px-10 ">
                  
                    <Link to={`/recipeDetail/${meal.idMeal}`}>
                      See Complete Recipe
                    </Link>
                    { existFavorites(meal.idMeal) ? <MdFavorite className="w-[35px] h-[40px] justify-start text-red-500" onClick={() => handleFavorites(meal.idMeal, meal)}/> : <MdFavoriteBorder className="w-[35px] h-[40px] text-red-500" title="Add to favorites" onClick={() => handleFavorites(meal.idMeal,meal)} />}
                  
                </div>
              </div>
            ));
          })}
    </div>
    </>
  );
};

export default Card;
