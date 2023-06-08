import { useParams } from "react-router-dom"
import "./ProductPage.css"
import { useEffect, useState } from "react";
import { SPOONACULAR_API_KEY } from "../../apiKey.js";
import Ingredients from "./Ingredients";
import Equipments from "./Equipments";
import { AiFillHome } from 'react-icons/ai';
import { TiArrowBack } from 'react-icons/ti'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ProductPage() {
    const [productData, setProductData] = useState([]);
    const params = useParams();
    const product_id = params.recipe;

    // https://api.spoonacular.com/recipes/{id}/information

    useEffect(() => {
        getProduct();
    }, [])

    const getProduct = async () => {

        const check = localStorage.getItem(product_id);

        if (check) {
            setProductData(JSON.parse(check));
            // console.log('local');
            // console.log(JSON.parse(check));
        }
        else {
            const api = await fetch(`https://api.spoonacular.com/recipes/${product_id}/information?apiKey=${SPOONACULAR_API_KEY}`);
            const data = await api.json();
            if (data) {
                localStorage.setItem(product_id, JSON.stringify(data));
            }
            setProductData(data);
            // console.log('api');
            // console.log(data);
        }
    }

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    return (
        <div className="productpage">
            <div className="iconsContainer">
                <Link to="/" className="icons"> <AiFillHome /></Link>
                <div onClick={goBack} className="icons"> <TiArrowBack /></div>
            </div>
            <div className="productPage-wrapper">
                <div className="product-left">
                    <img src={productData.image} alt={productData.title} className="product-image" />
                </div>
                <div className="product-right">
                    <h3>{productData.title}</h3>
                    {/* <h4>Summary</h4>
                    <div dangerouslySetInnerHTML={{ __html: productData.summary }}></div> */}

                    <div className="product-ingredients">
                        <h3>Ingredients</h3>
                        {productData.extendedIngredients &&
                            <Ingredients data={productData} />
                        }
                    </div>
                    <div className="product-equipments">
                        <h3>Equipments</h3>
                        <Equipments id={productData.id} />
                    </div>
                    <div className="product-instructions">
                        <h3>Instructions</h3>
                        <div dangerouslySetInnerHTML={{ __html: productData.instructions }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProductPage;