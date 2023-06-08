import { Link } from "react-router-dom";
import "./Categories.css"

function Categories() {

    const categories = [
        "main course",
        "side dish",
        "dessert",
        "appetizer",
        "salad",
        "bread",
        "breakfast",
        "soup",
        "beverage",
        "sauce",
        "marinade",
        "fingerfood",
        "snack",
        "drink"
    ];

    return (
        <div className="category-wrapper">
            {/* <p>Categories</p> */}
            <div className="category-cardWrapper">
                {categories.map((category, index) => {
                    return (
                        <Link to={`/${category}`} className="category-card" key={`cat-${index}`}>{category}</Link>
                    )
                })}</div></div>
    )
}

export default Categories;