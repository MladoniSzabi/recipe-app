import * as React from 'react'
import style from './Modal.module.css'

export default function Modal({ children, visible = false, onClosed }) {

    function hideModal() {
        onClosed()
    }

    function stopPropagation(event) {
        event.stopPropagation()
        event.preventDefault()
        return false
    }

    return <div className={style['modal-background'] + (visible ? "" : (" " + style['modal-hidden']))} onClick={hideModal}>
        <div className={style['modal-content']} onClick={stopPropagation}>
            <div className={style['modal-close']}><span onClick={onClosed}>X</span></div>
            {children}
        </div>
    </div>
}