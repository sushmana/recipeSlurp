import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";
import {
  getRecipes,
  getRandomRecipes,
  getAllCategories,
} from "../../redux/slices/recipes";
import {
  MdOutlineFavoriteBorder,
  MdLightMode,
  MdDarkMode,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { GiGrassMushroom } from "react-icons/gi";
import {wave} from '../../asset/images/wave.svg';
import './header.css';

const Header = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const category = useSelector((state) => state.recipeReducer.allCategory);
  const flattenedCategory = category.flat();

  useEffect(() => {
    if (searchTerm.length <= 0 || !isNaN(searchTerm)) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = () => {
    dispatch(getRecipes(searchTerm));
  };

  const handleRandomRecipe = () => {
    dispatch(getRandomRecipes());
  };
  useEffect(()=>{
    dispatch(getAllCategories());
  },[])
  

  return (
    <>
   
    <header className="fixed top-0 left-0 w-full h-[350px] p-[10px] shadow-md z-10 header-bg">
      <div className="flex flex-row py-4">
        {/* Logo */}
        <h1 className="flex gap-2 text-black text-3xl font-serif">
          Slurpp <GiGrassMushroom className="text-green-300 text-3xl" />
        </h1>
  
          {/* Random Recipe Button */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
          <button
          type="button"
          className="text-black font-bold rounded-2xl border-b-[5px] p-2 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          onClick={handleRandomRecipe}
        >
          Random
        </button>
        {/* Favorites Link */}
        <Link
              to={`/favoriteDetail`}
            >
              <h1 className="text-black  font-bold rounded-2xl border-b-[5px] p-2 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
                Favorites
              </h1>
              {/* <MdOutlineFavoriteBorder className="text-black w-[35px] h-[40px] border-b-[5px] rounded-[4px] hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" /> */}
        </Link>
      {/* Select Category */}
        <select
            name="category"
            id="category"
            title="Choose a category"
            className="text-black font-bold rounded-2xl border-b-[5px] p-2 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          >
            {flattenedCategory.map((item, index) => (
              <option key={index} value={item.strCategory}>
                {item.strCategory}
              </option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 w-full">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-lg w-full sm:w-[48%] md:w-[30%] max-w-md border border-gray-300 hover:cursor-pointer hover:bg-purple-400 hover:text-black hover:placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          />
          <button
            type="submit"
            
            onClick={handleSearch}
            disabled={buttonDisabled}
          >
            <CiSearch className="text-black w-[25px] h-[30px] " />
          </button>
          
          <button className="w-[35px] h-[40px] text-amber-400 ml-[10px]">
              {true ? <MdDarkMode className="w-[25px] h-[30px]" /> : <MdLightMode className="w-[25px] h-[30px]"/>}
            </button>
        </div>
        
      </div>

    </header>
    </>
  );
};

export default Header;