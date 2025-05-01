import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { CiSearch } from "react-icons/ci"
import {getRecipes, getRandomRecipes} from '../../redux/slices/recipes'


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
    console.log("Random Recipe")
  }

  return (
      <>  
      <div className='fixed top-0 left-0 w-full h-20 bg-black flex flex-col justify-center items-center z-10'>
      <div className='flex flex-row justify-center items-center gap-4 w-full max-w-4xl px-4'>
           <input type='input' placeholder='Search' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='p-2 rounded-lg w-full max-w-md border border-gray-300hover:cursor-pointer'/>
           <button type='submit' className='bg-red-500 rounded-2xl p-2 hover:bg-black-300' onClick={handleSearch} disabled={buttonDisabled}>
              <b><CiSearch className='text-white'/></b>
            </button>  
            <span className='ml-40'> 
              <button type='submit' className='bg-red-500 text-white rounded-2xl p-2 hover:bg-black-300' onClick={handleRandomRecipe}> Get Random Recipe </button>
            </span>           
      </div>
       
      </div>
      
      </>
    
  )
}

export default Header