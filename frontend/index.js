const domain = 'http://localhost:3000'

document.addEventListener('DOMContentLoaded', loadIngredients)

function loadIngredients() {
    const main = document.querySelector('main')
//
    fetch(`${domain}/ingredients`)
        .then(response => response.json())
        .then(json => {
            const p = document.createElement('p')
            p.innerText = JSON.stringify(json)
            return p
        })
        .then(p => {main.appendChild(p)})
}
