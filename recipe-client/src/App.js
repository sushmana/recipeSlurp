import logo from './logo.svg';
import './App.css';
import Main from './Components/main'
import RecipeDetail from './Components/recipedetail'
import FavoriteDetail from './Components/favoriteDetail'
import "./i18n";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <>
  
    <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/recipeDetail/:id" element={<RecipeDetail />} />
    <Route path="/favoriteDetail" element={<FavoriteDetail />} />
    </Routes>
    </>
  );
}

export default App;
