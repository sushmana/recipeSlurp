import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { CiSearch } from "react-icons/ci"
import {getRecipes, getRandomRecipes} from '../../redux/slices/recipes'
import { MdFavorite, MdOutlineFavoriteBorder, MdLightMode, MdDarkMode } from 'react-icons/md'
import {Link} from 'react-router-dom'


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
    dispatch(getRandomRecipes());
  }

  return (
      <>  
      <div className='fixed top-0 left-0 w-full h-20 bg-black flex flex-col justify-center items-center z-10'>
      <div className='flex flex-row justify-center items-center gap-4 w-full max-w-4xl px-4'>
            <span>
              {/* <AutoComplete/>  for all category*/}
            </span>
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