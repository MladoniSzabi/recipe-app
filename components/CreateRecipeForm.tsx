import * as React from 'react'
import style from './CreateRecipeForm.module.css'

export default function CreateRecipeForm({ onFinished }) {

    const [errors, setErrors] = React.useState(Array(4).fill(""))

    function onFormSubmit(ev: React.FormEvent) {
        if (errors.every((el) => el === "")) {
            const data = new FormData(ev.target as HTMLFormElement)
            let jsonData = {}
            data.forEach((val, key) => jsonData[key] = val)
            fetch("/api/RecipeItems", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            }).then((response) => {
                console.log(response.status)
                if (response.status >= 200 && response.status < 300) {
                    onFinished()
                }
            });
        }
        ev.preventDefault()
        ev.stopPropagation()
        return false
    }

    function validate(element: HTMLInputElement | HTMLTextAreaElement, index: number) {
        if (element.validity.valid) {
            setErrors(oldError => oldError.map((val, i) => (i == index) ? "" : val))
        } else {
            setErrors(oldError => oldError.map((val, i) => (i == index) ? element.validationMessage : val))
        }
    }

    return <div className={style['create-recipe']}>
        <form onSubmit={onFormSubmit}>
            {errors[1] && <p className={style['error-text']}>*{errors[1].substring(0, errors[1].length - 1)}:</p>}
            <label htmlFor='recipe-name'>Recipe Name: </label>
            <input onChange={(ev) => validate(ev.target, 0)} required type="text" id="recipe-name" placeholder='e.g. Spaghetti Bolognese' name="Name"></input>

            {errors[2] && <p className={style['error-text']}>*{errors[2].substring(0, errors[2].length - 1)}:</p>}
            <label htmlFor='recipe-ingredients'>Ingredients: </label>
            <textarea onChange={(ev) => validate(ev.target, 1)} required name="Ingredient" id="recipe-ingredients" placeholder={'e.g. 200g spaghetti\n2 cans peeled plum tomatoes'}></textarea>

            {errors[3] && <p className={style['error-text']}>*{errors[3].substring(0, errors[3].length - 1)}:</p>}
            <label htmlFor='recipe-method'>Method: </label>
            <textarea onChange={(ev) => validate(ev.target, 2)} required name="Method" id="recipe-method" placeholder={'e.g. put the pasta in boiling water\nheat a tablespoon of olive oil on medium heat'}></textarea>

            <button type="submit">Submit</button>
        </form>
    </div>
}