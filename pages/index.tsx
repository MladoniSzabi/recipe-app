import * as React from 'react'
import { RecipeItemComponent, RecipeItem } from '../components/RecipeItem'
import Modal from '../components/Modal'
import CreateRecipeForm from '../components/CreateRecipeForm'
import { useAuth } from '../components/Auth'

export default function IndexPage() {

    const [recipes, setRecipes] = React.useState<RecipeItem[]>([])
    const [showCreateRecipeModal, setShowRecipeModal] = React.useState(false)
    const [authToken] = useAuth()

    console.log(authToken)

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
            <button onClick={() => { setShowRecipeModal(true) }}>
                <span className="material-symbols-outlined">
                    add
                </span>
            </button>
        </header>
        <main>
            {recipes.map((el) => (
                <RecipeItemComponent key={el.id} item={el} />
            ))}
        </main>
        <Modal visible={showCreateRecipeModal}>
            <CreateRecipeForm onFinished={() => { setShowRecipeModal(false) }} />
        </Modal>
    </>
}
