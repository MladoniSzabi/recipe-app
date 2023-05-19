import * as React from 'react'
import style from './Modal.module.css'

export default function Modal({ children, visible = false }) {
    return <div className={style['modal-background'] + (visible ? "" : (" " + style['modal-hidden']))}>
        <div className={style['modal-content']}>
            {children}
        </div>
    </div>
}