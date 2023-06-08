import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import LeftBar from '../../components/LeftBar/LeftBar';
import Slider from '../../components/Slider/Slider';
import Categories from '../../components/Categories/Categories';
import './Home.css';
import { SPOONACULAR_API_KEY } from "../../apiKey.js";
import { Link } from "react-router-dom";

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [visitedItems, setVisitedItems] = useState([]);

  const handleSearch = async () => {
    if (searchQuery) {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${searchQuery}&number=20`
      );
      const data = await api.json();
      setSearchResults(data.results);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearchResults = () => {
    setSearchResults([]);
  };

  useEffect(() => {
    const visitedItemsData = localStorage.getItem("visitedItems");
    if (visitedItemsData && visitedItems.length === 0) {
      setVisitedItems(JSON.parse(visitedItemsData));
    }
  }, [visitedItems]);

  const addToVisitedItems = (product) => {
    if (product) {
      const productExists = visitedItems.find((item) => item.id === product.id);
      if (!productExists) {
        const updatedVisitedItems = [product, ...visitedItems];
        setVisitedItems(updatedVisitedItems);
        localStorage.setItem("visitedItems", JSON.stringify(updatedVisitedItems));
      }
    }
  };

  return (
    <div className="homePage">
      <LeftBar />
      <div className="homepage-rightBar">
        <div className="rightTopSearch">
          {/* <h4>Hello!</h4> */}
          <h3>Discover Recipes</h3>
          <div className="searchWrapper">
            <FiSearch />
            <input
              type="text"
              placeholder="Search for recipes or ingredients"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button className="searchButton" onClick={handleSearch}>Search</button>
          </div>
          {searchResults.length > 0 && (
            <div className="searchDropdown">
              <button className="clearButton" onClick={clearSearchResults}>
                Clear Results
              </button>
              <div className='searches'>
                {searchResults.map((result) => (
                  <Link
                    to={`/recipes/${result.id}`}
                    onClick={() => addToVisitedItems(result)}
                    key={result.id}>
                    <div className="searchResult">
                      <p>{result.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="rightMidCarousal">
          <h3>Popular</h3>
          <Slider />
        </div>
        <div className="rightBottomCategories">
          <h3>Categories</h3>
          <Categories />
        </div>
      </div>
    </div>
  );
}

export default Home;
