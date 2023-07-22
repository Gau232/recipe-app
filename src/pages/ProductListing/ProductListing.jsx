import "./ProductListing.css";
import { useState, useEffect } from "react";
import { SPOONACULAR_API_KEY } from "../../apiKey.js";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LeftBar from "../../components/LeftBar/LeftBar";
import BottomBar from '../../components/BottomBar/BottomBar';

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [visitedItems, setVisitedItems] = useState([]);
  const [navBar,setnavBar] = useState(barTypeonLoad());

  function barTypeonLoad() {
    return (window.innerWidth < 800)?"bottom":"left";
  }; 

  const params = useParams();
  const type = params.product_type === "recently-viewed" ? "visitedItems" : params.product_type;

  useEffect(() => {
    getProducts();
  }, [type]);

  useEffect(() => {
    const visitedItemsData = localStorage.getItem("visitedItems");
    if (visitedItemsData && visitedItems.length === 0) {
      setVisitedItems(JSON.parse(visitedItemsData));
    }
  }, [visitedItems]);

  const getProducts = async () => {
    const check = localStorage.getItem(type);

    if (check) {
      setProducts(JSON.parse(check));
      console.log("Local");
      console.log(products);
    } else if (type !== "visitedItems") {
      console.log(type);
      const api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&instructionsRequired=true&number=48&type=${type}`
      );
      const data = await api.json();
      if (data && data.results) {
        localStorage.setItem(type, JSON.stringify(data.results));
        setProducts(data.results);
        console.log("api");
        console.log(data.results);
      }
    }
  };

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

  window.addEventListener('resize',()=>{
    if(window.innerWidth < 800){
      setnavBar("bottom");
    }else{
      setnavBar("left");
    }
  });

  return (
    <div className="productListing-wrapper0">
      <div className="leftBar-container">
      {(navBar==="left")?(<LeftBar />):(<BottomBar/>)}
        {/* <LeftBar /> */}
      </div>
      <div className="rigthConatiner">
        <h3>{type}</h3>
        <div className="productList-wrapper">
          {products.map((product) => {
            return (
              <Link
                to={`/recipes/${product.id}`}
                className="productList-product"
                key={product.id}
                onClick={() => addToVisitedItems(product)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  onError={(e) => {
                    e.target.src = "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";
                  }}
                />
                <p>{product.title}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
