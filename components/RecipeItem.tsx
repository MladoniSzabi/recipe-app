import * as React from 'react'
import style from './RecipeItem.module.css'
import { useAuth } from './Auth'

export type RecipeItem = { id: number, name: string, ingredient: string, method: string, votes: number }

export function RecipeItemComponent({ item, onVote }: { item: RecipeItem, onVote: (id: number) => void }) {

    const [authToken] = useAuth()
    const [loading, setLoading] = React.useState(false)

    function vote() {
        console.log("voting")
        setLoading(true)
        fetch("/api/RecipeItems/vote/" + String(item.id), {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ UserId: authToken })
        }).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                onVote(item.id)
            }
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }

    return <div className={style["recipe-item"]}>
        <img src="/img.png" alt="image go brrr" />
        <p className={style["body"]}>{item.name}</p>
        <div className={style["buttons"]}>
            <p>Vote count: {item.votes}</p>
            <button onClick={vote} disabled={loading}>{loading ? "..." : "Vote"}</button>
        </div>
    </div>
}