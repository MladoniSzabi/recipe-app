import * as React from 'react'
import { RecipeItemComponent, RecipeItem } from '../components/RecipeItem'
import Modal from '../components/Modal'
import CreateRecipeForm from '../components/CreateRecipeForm'
import { useAuth } from '../components/Auth'

export default function IndexPage() {

    const [votes, setVotes] = React.useState<Number[]>(null)
    const [recipes, setRecipes] = React.useState<RecipeItem[]>([])
    const [showCreateRecipeModal, setShowRecipeModal] = React.useState(false)
    const [authToken] = useAuth()

    function onVote(itemId: number) {
        let recipeItem = recipes.find((recipe) => { console.log(recipe); return recipe.id == itemId; })
        recipeItem.votes += 1
        setRecipes((oldRecipes) => oldRecipes.map(el => el.id == itemId ? recipeItem : el))
        setVotes((oldVotes) => [...oldVotes, itemId])
    }

    function onNewRecipeAdded(newRecipe) {
        setShowRecipeModal(false)
        setRecipes((oldRecipes) => [newRecipe, ...oldRecipes])
    }

    React.useEffect(() => {
        fetch('/api/RecipeItems')
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data.map((el) => (
                    {
                        id: el.id,
                        name: el.name,
                        ingredient: el.ingredient,
                        method: el.method,
                        votes: el.voteCount
                    })))
            })
        fetch("/api/RecipeItems/votes/" + authToken)
            .then((res) => res.json())
            .then((data) => {
                setVotes(data)
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
                <RecipeItemComponent disabled={votes == null} canVote={(votes != null) && (!votes.includes(el.id))} onVote={onVote} key={el.id} item={el} />
            ))}
            <Modal visible={showCreateRecipeModal}>
                <CreateRecipeForm onFinished={onNewRecipeAdded} />
            </Modal>
        </main>
    </>
}
