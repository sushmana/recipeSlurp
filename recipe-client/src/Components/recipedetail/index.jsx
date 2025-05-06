import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import './recipedetail.css'
import { DotLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getRecipesDetail } from "../../redux/slices/recipes";
import { useParams } from "react-router-dom";
import recipeDetailSaga from "src/redux/saga/recipeDetailSaga";
import {MdArrowBackIos} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const RecipeDetail = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const recipesData = useSelector((state) => state.recipeReducer);
  const recipesDetailData = recipesData.recipeDetailData;
  const isLoadingDetail = recipesData.isLoadingDetail;

  const [videoId, setVideoId] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const meal = useParams();

  useEffect(() => {
    if(!meal) return;
    dispatch(getRecipesDetail(meal));
  }, [meal]);

  useEffect(() => {
    if (recipesDetailData.length === 0) return;
    setVideoId(recipesDetailData[0]?.meals[0]?.strYoutube?.split("=")[1]);
    setIngredients(recipesDetailData[0]?.meals?.map((meal) => {
      return Object.keys(meal)
        .filter((key) => key.startsWith('strIngredient') && meal[key] && meal[key].trim() !== "")
        .map((key) => meal[key]);
    }));
    setMeasures(recipesDetailData[0]?.meals?.map((meal) => {
      return Object.keys(meal)
        .filter((key) => key.startsWith('strMeasure') && meal[key] && meal[key].trim() !== "")
        .map((key) => meal[key]);
    }));
  },[recipesDetailData]);

  return (
    <>

      {isLoadingDetail ? (
        <>
          <div className="flex justify-center items-center ">
            <DotLoader size={50} color="gray" loading={isLoadingDetail} />
          </div>
        </>
      ): (
      <>

      <div className="p-6 w-full h-full  text-black rounded-lg shadow-md">
      <Link to="/" ><MdArrowBackIos/></Link>
        <div className="flex items-center justify-center gap-10">
          <h6 className="text-rose-400 text-3xl font-bold ">
            {recipesDetailData.length > 0 &&
              recipesDetailData[0].meals[0].strMeal}
          </h6><div className="flex justify-end">
          <MdFavoriteBorder className="text-rose-400 w-[35px] h-[40px] hover:cursor-pointer" title="Add to favorites"/></div>
         </div>
         
        <div className="flex flex-col items-start mt-4 mb-4 text-black">
          <h3 className="mb-4 text-orange-300 text-2xl">Instructions:</h3>
          <p className="text-justify shadow-shdw lg:w-[100%] h-auto lg:mb-4 mt-4 p-4">
            {recipesDetailData.length > 0 &&
              recipesDetailData[0].meals[0].strInstructions}
          </p>
          <h3 className="mb-4 text-orange-300 text-2xl" >Ingredients:</h3>
          {/* add ingredients */}
           <div className="flex justify-center items-center rounded-lg shadow-shdw lg:w-[100%] h-auto lg:mb-4 mt-4 p-4">
           <ul className='list-disc list-inside'>
            {ingredients && ingredients.map((ingredient, index) => {
            return ingredient.map((item, itemIndex) => {
              return (
                <li key={`${index}-${itemIndex}`} className="text-justify">
                  {item} - {measures[index][itemIndex]}
                </li>
              );
            });
                
          })}  
        </ul>
        </div>
          
          {videoId ? (<>
          <h3 className="mb-4 text-orange-300 text-2xl">Video available:</h3>
          <div className="flex justify-center items-center rounded-lg shadow-shdw lg:w-[100%] h-auto lg:mb-4 mt-4">
            <iframe
              className="h-[500px] w-[900px] my-[20px]"
              src={"https://www.youtube.com/embed/" + videoId}
              title="YouTube video player"
              allowFullScreen
              loading="lazy"
            />
          </div>
          </>
        ) : (
          <p className="text-red-500">Video not available</p>
        )}
        </div>
      </div>
     
      </>
      )}
    </>
  );
};

export default RecipeDetail;
