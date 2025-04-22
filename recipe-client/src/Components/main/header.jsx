import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { CiSearch } from "react-icons/ci"
import {getRecipes} from '../../redux/reducers/recipes'


const Header = () => {

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (searchTerm) =>{
    console.log("Search button clicked", searchTerm);

    dispatch(getRecipes(searchTerm));
  }
  return (
      <>
      <div class='flex flex-row justify-center items-center content-center my-10 w-auto h-10 bg-gray rounded-lg shadow-md font-bold'>
           <input type='input' placeholder='Search' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='p-2 rounded-lg hover:cursor-pointer'/>
         
            <button type='submit' className='bg-gray-200 rounded-lg p-2 hover:bg-gray-300' onClick={handleSearch}>
            <CiSearch className='text-blue-500'/>
            </button>
      </div>
      </>
    
  )
}

export default Header