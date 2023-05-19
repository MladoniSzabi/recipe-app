import * as React from 'react'
import style from './RecipeItem.module.css'

export type RecipeItem = { id: number, name: string, ingredient: string, method: string, votes: number }

export function RecipeItemComponent({ item }: { item: RecipeItem }) {

    return <div className={style["recipe-item"]}>
        <img src="/img.png" alt="image go brrr" />
        <p className={style["body"]}>{item.name}</p>
        <div className={style["buttons"]}>
            <button>Vote</button>
        </div>
    </div>
}