import * as React from 'react'
import { RecipeItemComponent, RecipeItem } from '../components/RecipeItem'
import Modal from '../components/Modal'
import CreateRecipeForm from '../components/CreateRecipeForm'
import { useAuth } from '../components/Auth'

export default function IndexPage() {

    const [recipes, setRecipes] = React.useState<RecipeItem[]>([])
    const [showCreateRecipeModal, setShowRecipeModal] = React.useState(false)
    const [authToken] = useAuth()

    function onVote(itemId: number) {
        let recipeItem = recipes.find((recipe) => { console.log(recipe); return recipe.id == itemId; })
        recipeItem.votes += 1
        setRecipes((oldRecipes) => oldRecipes.map(el => el.id == itemId ? recipeItem : el))
    }

    React.useEffect(() => {
        fetch('/api/RecipeItems')
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data.map((el) => (
                    {
                        id: el.recipe.id,
                        name: el.recipe.name,
                        ingredient: el.recipe.ingredient,
                        method: el.recipe.method,
                        votes: el.voteCount
                    })))
            })
    }, [])

    if (recipes.length == 0) {
        return <main>
            <p>Loading...</p>
        </main>
    }

    return <>
        <header>
            <button onClick={() => { setShowRecipeModal(true) }}>
                <span className="material-symbols-outlined">
                    add
                </span>
            </button>
        </header>
        <main>
            {recipes.map((el) => (
                <RecipeItemComponent onVote={onVote} key={el.id} item={el} />
            ))}
            <Modal visible={showCreateRecipeModal}>
                <CreateRecipeForm onFinished={() => { setShowRecipeModal(false) }} />
            </Modal>
        </main>
    </>
}
