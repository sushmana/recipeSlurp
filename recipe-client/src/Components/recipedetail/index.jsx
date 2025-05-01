import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import "./recipedetail.css";
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
  const meal = useParams();

  useEffect(() => {
    dispatch(getRecipesDetail(meal));
  }, []);
  // fetch Ingredients
  const videoId = recipesDetailData[0]?.meals[0]?.strYoutube.split("=")[1];
 
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

      <div className="p-6 m-2 w-full h-full bg-black text-white rounded-lg shadow-md">
      <Link to="/" ><MdArrowBackIos/></Link>
        <div className="flex flex-col items-center justify-start">
          <h6 className="text-rose-400 size-20 text-3xl font-bold">
            {" "}
            {recipesDetailData.length > 0 &&
              recipesDetailData[0].meals[0].strMeal}
          </h6>
        </div>
        <div className="flex flex-col items-start mt-4 mb-4 text-white">
          <h3 className="mb-4 text-orange-300">Instructions:</h3>
          <p className="text-justify">
            {recipesDetailData.length > 0 &&
              recipesDetailData[0].meals[0].strInstructions}
          </p>
          <h3 className="mb-4 text-orange-300">Ingredients:</h3>
          {/* add ingredients */}
          
          {videoId ? (<>
          <h3 className="mb-4 text-orange-300">Video available:</h3>
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
