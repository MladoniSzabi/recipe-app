import * as React from 'react'

type RecipeList = { id: number, name: string, ingredient: string, method: string }[]

export default function IndexPage() {

    const [recipes, setRecipes] = React.useState<RecipeList>([])

    React.useEffect(() => {
        fetch('/api/RecipeItems')
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data)
            })
    }, [])

    if (recipes.length == 0) {
        return <main>
            <p>Loading...</p>
        </main>
    }

    return <main>
        {recipes.map((el) => (<div className="row">
            <img src="/img.png" alt="image go brrr" />
            <p className="body">{el.name}</p>
            <div className="buttons">
                <button>Vote</button>
            </div>
        </div>))}
    </main>
}
