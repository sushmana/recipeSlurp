import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { CiSearch } from "react-icons/ci"
import {getRecipes} from '../../redux/slices/recipes'


const Header = () => {

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isValidSearchTerm, setIsValidSearchTerm] = useState(true);
  useEffect(()=>{
    if (!isNaN(searchTerm) && searchTerm.trim() !== '') {
      setIsValidSearchTerm(false); // Invalid if it's a number
    } else {
      setIsValidSearchTerm(true); // Valid if it's not a number
    }
    console.log("searchTerm", searchTerm)
  }
  , [searchTerm]);

  const handleSearch = () =>{
    dispatch(getRecipes(searchTerm));
  }
  return (
      <>  

      <div className='fixed top-0 left-0 w-full h-20 bg-black flex flex-col justify-center items-center z-10'>
      <div className='flex flex-row justify-center items-center gap-4 w-full max-w-4xl px-4'>
           <input type='input' placeholder='Search' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='p-2 rounded-lg w-full max-w-md border border-gray-300hover:cursor-pointer'/>
           <button type='submit' className='bg-gray-200 rounded-2xl p-2 hover:bg-black-300' onClick={handleSearch}>
            <CiSearch className='text-blue-600'/>
            </button>            
      </div>
          {/* validate search string */}
      {!isValidSearchTerm ? (<div className="text-lg text-red-200">Recipe name should only contain words</div>): <></>}
        
      </div>
      
      </>
    
  )
}

export default Header