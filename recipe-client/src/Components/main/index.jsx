import React from 'react';
import Card from '../common/card';
import Header from './header';

const Recipe = () => {
  return (
    <div className='bg-orange-300'>
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex-1 overflow-y-auto mt-64 p-4">
        <Card />
      </div>
    </div>
    </div>
  );
};

export default Recipe;