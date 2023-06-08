const Ingredients = ({ data }) => {
  return (
    <div className="ingredients-wrapper">
      {data.extendedIngredients.map((ingredients) => {
        return (
          <div key={`${ingredients.id}-${ingredients.name}`}>
            <img
              src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredients.image}`}
              alt={ingredients.image}
            />
            <p>{`${ingredients.amount} ${ingredients.unit} ${ingredients.nameClean}`}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Ingredients;