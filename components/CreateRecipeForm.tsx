import * as React from 'react'
import style from './CreateRecipeForm.module.css'

export default function CreateRecipeForm() {
    return <div className={style['create-recipe']}>
        <form>
            <label htmlFor='recipe-name'>Recipe Name: </label>
            <input type="text" id="recipe-name" name="name"></input>
            <label htmlFor='recipe-ingredients'>Ingredients: </label>
            <textarea name="ingredients" id="recipe-ingredients"></textarea>
            <label htmlFor='recipe-method'>Method: </label>
            <textarea name="method" id="recipe-method"></textarea>
            <div></div>
            <button type="submit">Submit</button>
        </form>
    </div>
}