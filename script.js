window.onload = () => {
    const row = document.querySelector('.row')
    const main = document.querySelector('main')

    for (let i = 0; i < 15; i++) {
        main.appendChild(row.cloneNode(true))
    }
}