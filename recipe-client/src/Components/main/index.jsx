import React from 'react';
import Card from '../common/card';
import Header from './header';

const Recipe = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex-1 overflow-y-auto mt-40 p-4">
        <Card />
      </div>
    </div>
  );
};

export default Recipe;