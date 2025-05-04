import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { CiSearch } from "react-icons/ci"
import {getRecipes, getRandomRecipes,setRandomRecipe, getAllCategories } from '../../redux/slices/recipes'
import { MdFavorite, MdOutlineFavoriteBorder, MdLightMode, MdDarkMode } from 'react-icons/md'
import {Link} from 'react-router-dom'
import {GiGrassMushroom} from 'react-icons/gi'
import { getActiveElement } from '@testing-library/user-event/dist/utils'

const Header = () => {

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  useEffect(()=>{
    if ( searchTerm.length <= 0 || !isNaN(searchTerm)){
      setButtonDisabled(true);
    }else{
      setButtonDisabled(false);
    }
  }
  , [searchTerm]);

  const handleSearch = () =>{
    dispatch(getRecipes(searchTerm));
  }

  const handleRandomRecipe = () => {
    // dispatch(setRandomRecipe('s'));
    dispatch(getRandomRecipes());
  }
  
  const handleCategoryChange = (e) => {
    dispatch(getAllCategories());
  }

  const category = useSelector((state) => state.recipeReducer.allCategory);
  const flattenedCategory = category.flat();
  return (
      <>  
      <div className='fixed top-0 left-0 w-full h-20 bg-black flex flex-col justify-center items-center z-10'>
      <h1 className=" flex flex-row gap-2 text-orange-400 text-3xl mt-[60px] font-serif bg-blend-hard-light">Recipes <GiGrassMushroom className="text-green-300 text-3xl" /></h1>
      <div className='flex flex-row justify-center items-center gap-4 w-full max-w-4xl px-4'>
            {/* <span className='flex flex-row gap-2'>
            <label htmlFor="category" className="text-white font-bold">Select a Category:</label>
            <select
            name="category"
            id="category"
            title="Choose a category" // Adds a tooltip
            onClick={() => dispatch(getAllCategories())}
            onChange={handleCategoryChange}
          >
            {flattenedCategory.map((item, index) => (
              <option key={index} value={item.strCategory}>
                {item.strCategory}
              </option>
            ))}
          </select>
          </span> */}
           <input type='input' placeholder='Search' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='p-2 rounded-lg w-full max-w-md border border-gray-300 hover:cursor-pointer  hover:bg-purple-400 hover:text-white hover: placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50'/>
           <button type='submit' className='bg-red-500 rounded-2xl p-2  hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50' onClick={handleSearch} disabled={buttonDisabled}>
              <b><CiSearch className='text-white'/></b>
            </button>  
            <span className='ml-30 px-10'> 
              <button type='submit' className='bg-red-500 text-white rounded-2xl border-b-[5px] p-2 hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ' onClick={handleRandomRecipe}> Random Recipe </button>
            </span>  
        
            <span className='ml-30 px-10'> 
            <Link to={`/favoriteDetail`} className="text-white hover:underline ">
                      <MdOutlineFavoriteBorder className='text bg-red-500 w-[35px] h-[40px] border-b-[5px] rounded-[4px] hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 '/>
            </Link>
            </span>   

            <span>
            {/* <MdDarkMode className='w-[35px] h-[40px] text-gray-950'/> */}
            <MdLightMode className='w-[35px] h-[40px] text-amber-400'/>
            </span>      
      </div>
       
      </div>
      
      </>
    
  )
}

export default Header