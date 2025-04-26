import React from 'react'
import { useParams } from 'react-router-dom';

export const RecipeDetail = () => {
const { id } = useParams();
console.log("id", id); 
  return (
    <>
    <h3 className='text-blue-700'> Recipe of id {id}</h3>
    </>
  )
}

export default RecipeDetail;