import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdFavoriteBorder, MdArrowBackIos } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { getRecipesDetail } from "../../redux/slices/recipes";
import loader from "../../asset/images/loader.gif";

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
    setIngredients(
      recipesDetailData[0]?.meals?.map((meal) => {
        return Object.keys(meal)
          .filter((key) => key.startsWith("strIngredient") && meal[key]?.trim())
          .map((key) => meal[key]);
      })
    );
    setMeasures(
      recipesDetailData[0]?.meals?.map((meal) => {
        return Object.keys(meal)
          .filter((key) => key.startsWith("strMeasure") && meal[key]?.trim())
          .map((key) => meal[key]);
      })
    );
  }, [recipesDetailData]);

  return (
    <>
      {isLoadingDetail ? (
        <div className="flex justify-center items-center h-screen">
          <img
            src={loader}
            alt="loader"
            style={{ width: "50vh" }}
            className="img-fluid"
          />
        </div>
      ) : (
        <div className="p-4 w-full h-full text-black rounded-lg shadow-md">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            <MdArrowBackIos className="text-2xl" />
          </Link>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mt-4">
            <h6 className="text-rose-400 text-2xl lg:text-3xl font-bold text-center lg:text-left">
              {recipesDetailData.length > 0 &&
                recipesDetailData[0].meals[0].strMeal}
            </h6>
            <MdFavoriteBorder
              className="text-rose-400 w-[30px] h-[35px] lg:w-[35px] lg:h-[40px] hover:cursor-pointer"
              title="Add to favorites"
            />
          </div>

          <div className="flex flex-col items-start mt-4 mb-4 text-black">
            <h3 className="mb-4 text-orange-300 text-xl sm:text-2xl">
              Instructions:
            </h3>
            <p className="text-justify shadow-shdw w-full lg:w-[100%] h-auto lg:mb-4 mt-4 p-4 text-sm sm:text-base">
              {recipesDetailData.length > 0 &&
                recipesDetailData[0].meals[0].strInstructions}
            </p>
            <h3 className="mb-4 text-orange-300 text-xl sm:text-2xl">
              Ingredients:
            </h3>
            <div className="flex flex-col justify-center items-start rounded-lg shadow-shdw w-full lg:w-[100%] h-auto lg:mb-4 mt-4 p-4">
              <ul className="list-disc list-inside text-sm sm:text-base">
                {ingredients &&
                  ingredients.map((ingredient, index) => {
                    return ingredient.map((item, itemIndex) => {
                      return (
                        <li
                          key={`${index}-${itemIndex}`}
                          className="text-justify"
                        >
                          {item} - {measures[index][itemIndex]}
                        </li>
                      );
                    });
                  })}
              </ul>
            </div>

            {videoId ? (
              <>
                <h3 className="mb-4 text-orange-300 text-xl sm:text-2xl">
                  Video available:
                </h3>
                <div className="flex justify-center items-center rounded-lg shadow-shdw w-full lg:w-[100%] h-auto lg:mb-4 mt-4">
                  <iframe
                    className="h-[200px] w-[100%] sm:h-[300px] sm:w-[600px] lg:h-[500px] lg:w-[900px] my-[20px]"
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
      )}
    </>
  );
};

export default RecipeDetail;