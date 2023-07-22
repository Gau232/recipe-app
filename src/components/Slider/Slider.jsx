import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useEffect, useState } from 'react';
import { SPOONACULAR_API_KEY } from '../../apiKey.js';
import { Link } from 'react-router-dom'
import './Slider.css'

export default function Slider() {
  const [visitedItems, setVisitedItems] = useState([]);
  const [random, setRandom] = useState([]);
  const [perPage, setPerPage] = useState(()=>{
    if(window.innerWidth > 850){
      return 4;
    }
    if(window.innerWidth < 850 && window.innerWidth >= 500){
      return 3;
    }
    if(window.innerWidth < 500){
      return 2;
    }
  });

 
  useEffect(() => {
    getRandom();
  }, []);

  const getRandom = async () => {
    const check = localStorage.getItem('random');

    if (check) {
      setRandom(JSON.parse(check));
      console.log(check);
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=20`);
      const data = await api.json();
      if (data && data.recipes) {
        localStorage.setItem('random', JSON.stringify(data.recipes));
        setRandom(data.recipes);
      }
      console.log(data.recipes);
    }
    console.log(random);
  };

  useEffect(() => {
    const visitedItemsData = localStorage.getItem("visitedItems");
    if (visitedItemsData && visitedItems.length === 0) {
      setVisitedItems(JSON.parse(visitedItemsData));
    }
  }, [visitedItems]);

  const addToVisitedItems = (product) => {
    const productExists = visitedItems.find((item) => item.id === product.id);
    if (!productExists) {
      const updatedVisitedItems = [product, ...visitedItems];
      setVisitedItems(updatedVisitedItems);
      localStorage.setItem("visitedItems", JSON.stringify(updatedVisitedItems));
    }
  };

  window.addEventListener('resize',()=>{
    if(window.innerWidth > 850){
      setPerPage(4);
    }
    if(window.innerWidth < 850){
      setPerPage(3);
    }
    if(window.innerWidth < 500){
      setPerPage(2);
    }
  });

  return (
    <Splide options={{ rewind: true, perPage: perPage, gap: '1rem', autoplay: true }}>
      {random.map((recipe) => {
        return (
          <SplideSlide key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`} className="slider-product" onClick={() => addToVisitedItems(recipe)}>
              <div>
                <img src={recipe.image} alt={recipe.title} />
                <p>{recipe.title}</p>
              </div>
            </Link>
          </SplideSlide>
        );
      })}
    </Splide>
  );
}
