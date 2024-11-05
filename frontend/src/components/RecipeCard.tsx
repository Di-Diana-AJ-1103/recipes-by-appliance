import { Recipe } from "../types";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

interface Props {
    recipe: Recipe;
    isFavorite : boolean;
    onClick: () => void;
    onFavoriteButtonClick: (recipe: Recipe) => void;
}

const RecipeCard = ({recipe, onClick, onFavoriteButtonClick}: Props) => {
    return (
        <div className="recipe-card" onClick={onClick}>
            <img src={recipe.image}></img>
            <div className="recipe-card-title">
                <span onClick={(event)=>{
                    event.stopPropagation()
                    onFavoriteButtonClick(recipe);
                }}>
                    {isFavorite ? (<AiFillHeart/>) : (<AiOutlineHeart size={25}/>)}
                </span>
                <h3>{recipe.title}</h3>
            </div>
        </div>
    );
};

export default RecipeCard;