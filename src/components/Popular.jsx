import { useEffect, useState } from "react";
import {SPOONACULAR_API_KEY} from '../apiKey';

function Popular() {
    const [popular,setPopular] = useState([]);

    useEffect(()=>{
        getPopular();
    },[])

    const getPopular = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=10`);
        const data = await api.json();
        setPopular(data.recipes);
    };


    return (
        <div>Popular
            {popular.map((recipe)=>{
                return (
                <div >
                    <h3>Popular</h3>
                    {popular.map((recipe)=>{
                        return (
                            <div>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title} />
                            </div>
                        )
                    })}
                </div>)
            })}
        </div>
    )
}

export default Popular;