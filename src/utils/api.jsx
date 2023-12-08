import React, { useState, useEffect } from 'react';
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";

const App = () => {
    const [posts, setPosts] = useState([]);

    const api = 'https://norma.nomoreparties.space/api/ingredients';
    useEffect(() => {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPosts(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <BurgerIngredients {...posts}/>
    )
}

    export default App;