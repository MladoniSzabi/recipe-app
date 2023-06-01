import * as React from 'react'
import style from './RecipeItem.module.css'
import { useAuth } from './Auth'

export type RecipeItem = { id: number, name: string, ingredient: string, method: string, votes: number }
type ComponentProps = { canVote: boolean, disabled: boolean, item: RecipeItem, onVote: (id: number) => void }

export function RecipeItemComponent({ disabled, canVote, item, onVote }: ComponentProps) {

    const [authToken] = useAuth()
    const [loading, setLoading] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)

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

    function toggleIsOpen(event) {
        // Have to store this in a variable since currentTarget is only set while the event is being handler
        // Once requestAnimationFrame fires, currentTarget will be null
        let target = event.currentTarget
        setIsOpen((wasOpen) => {
            if (wasOpen)
                collapseSection(target.nextSibling)
            else
                expandSection(target.nextSibling)
            return !wasOpen
        })
    }

    function collapseSection(element) {
        // get the height of the element's inner content, regardless of its actual size
        var sectionHeight = element.scrollHeight;

        // temporarily disable all css transitions
        var elementTransition = element.style.transition;
        element.style.transition = '';

        // on the next frame (as soon as the previous style change has taken effect),
        // explicitly set the element's height to its current pixel height, so we 
        // aren't transitioning out of 'auto'
        requestAnimationFrame(function () {
            element.style.height = sectionHeight + 'px';
            element.style.transition = elementTransition;

            // on the next frame (as soon as the previous style change has taken effect),
            // have the element transition to height: 0
            requestAnimationFrame(function () {
                element.style.height = 0 + 'px';
            });
        });
    }

    function expandSection(element) {
        // get the height of the element's inner content, regardless of its actual size
        var sectionHeight = element.scrollHeight;

        // have the element transition to the height of its inner content
        element.style.height = sectionHeight + 'px';
        let callback = function (e) {
            // remove this event listener so it only gets triggered once    
            element.removeEventListener('transitionend', callback);

            // remove "height" from the element's inline styles, so it can return to its initial value
            element.style.height = null;
        }
        // when the next css transition finishes (which should be the one we just triggered)
        element.addEventListener('transitionend', callback);
    }

    const isDisabled = disabled || loading || !canVote

    return <>
        <div className={style["recipe-item"]} onClick={toggleIsOpen}>
            <img src="/img.png" alt="image go brrr" />
            <p className={style["body"]}>{item.name}</p>
            <div className={style["buttons"]}>
                <p>Vote count: {item.votes}</p>
                <button onClick={vote} disabled={isDisabled}>{isDisabled ? "Voted" : "Vote"}</button>
            </div>
        </div>
        <div style={{ height: "0px" }} className={style['recipe-content']}>
            <div>
                <h4>Ingredients</h4>
                <pre>{item.ingredient}</pre>
                <hr></hr>
                <h4>Method</h4>
                <pre>{item.method}</pre>
            </div>
        </div>
    </>
}