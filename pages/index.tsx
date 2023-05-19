import * as React from 'react'
import { RecipeItemComponent, RecipeItem } from '../components/RecipeItem'

export default function IndexPage() {

    const [recipes, setRecipes] = React.useState<RecipeItem[]>([])

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

    return <>
        <header>
            <button>
                <span className="material-symbols-outlined">
                    add
                </span>
            </button>
        </header>
        <main>
            {recipes.map((el) => (
                <RecipeItemComponent item={el} />
            ))}
        </main>
    </>
}
