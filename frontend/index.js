Object.prototype.last = function () {
    return this[this.length - 1]
}


const domain = 'http://localhost:3000'

document.addEventListener('DOMContentLoaded', loadIngredients)

function loadIngredients() {
    const ingredientMenus = document.querySelector('div.ingredient-menus').parentElement.children.last()

    fetch(`${domain}/ingredients`)
        .then(response => response.json())
        .then(json => {
            const datatext = document.createElement('input')
            datatext.type = 'text'
            datatext.name = 'ingredients'
            datatext.id = 'ingredient-text'
            datatext.setAttribute('list', 'ingredients')
            datatext.placeholder = 'Ingredient'
            datatext.addEventListener('change', setMeasure)
            datatext.addEventListener('change', event => {addIngredientButton(event.currentTarget.parentElement)})

            ingredientMenus.appendChild(datatext)

            const datalist = document.createElement('datalist')
            datalist.id = 'ingredients'
            
            const ingredients = Array.from(json)
            ingredients.sort((ing1, ing2) => {
                if (ing1.name < ing2.name) {
                    return -1
                } else {
                    return 1
                }
            }).forEach(ing => {
                const ingItem = document.createElement('option')
                ingItem.textContent = ing.name

                datalist.appendChild(ingItem)
            })

            ingredientMenus.appendChild(datalist)
        })
        .then(loadQuantities)
}

function loadQuantities() {
    const ingredientMenus = document.querySelector('div.ingredient-menus').parentElement.children.last()
//
    fetch(`${domain}/quantities`)
        .then(response => response.json())
        .then(json => {
            const datatext = document.createElement('input')
            datatext.type = 'text'
            datatext.name = 'quantities'
            datatext.id = 'quantity-text'
            datatext.setAttribute('list', 'quantities')
            datatext.placeholder = 'Quantity'
            datatext.addEventListener('change', event => {addIngredientButton(event.currentTarget.parentElement)})

            ingredientMenus.appendChild(datatext)

            const datalist = document.createElement('datalist')
            datalist.id = 'quantities'
            
            const quantities = Array.from(json)
            quantities.forEach(quantity => {
                const quantityItem = document.createElement('option')
                quantityItem.textContent = quantity.quantity

                datalist.appendChild(quantityItem)
            })

            ingredientMenus.appendChild(datalist)
        })
        .then(loadMeasures)
}

function loadMeasures() {
    const ingredientMenus = document.querySelector('div.ingredient-menus').parentElement.children.last()
//
    fetch(`${domain}/measures`)
        .then(response => response.json())
        .then(json => {
            const datatext = document.createElement('input')
            datatext.type = 'text'
            datatext.name = 'measures'
            datatext.id = 'measure-text'
            datatext.setAttribute('list', 'measures')
            datatext.placeholder = 'Measurement'
            datatext.addEventListener('change', event => {addIngredientButton(event.currentTarget.parentElement)})

            ingredientMenus.appendChild(datatext)

            const datalist = document.createElement('datalist')
            datalist.id = 'measures'
            datalist.name = 'measures'
            
            const measures = Array.from(json)
            measures.sort((measure1, measure2) => {
                if (measure1.measure < measure2.measure) {
                    return -1
                } else {
                    return 1
                }
            }).forEach(measure => {
                const measureItem = document.createElement('option')
                measureItem.textContent = measure.measure

                datalist.appendChild(measureItem)
            })

            ingredientMenus.appendChild(datalist)
        })
}

function setMeasure() {
    let ingredient = document.querySelector('input#ingredient-text').value
    ingredient = ingredient.split(/\s+/).join('-')
    
    fetch(`${domain}/measures/${ingredient}`)
        .then(response => response.json())
        .then(json => {
            const measure = document.querySelector('input#measure-text')
            if (json.measure) {
                measure.value = json.measure
            } else {
                measure.value = ''
            }
        })
}

function addIngredientButton(menuDiv) {
    const ingredient = menuDiv.querySelector('input#ingredient-text')
    const quantity = menuDiv.querySelector('input#quantity-text')
    const measure = menuDiv.querySelector('input#measure-text')

    if (ingredient.value && quantity.value && measure.value) {
        const addBtn = document.createElement('button')
        addBtn.textContent = 'Add Ingredient'
        //addBtn.addEventListener('click', event => {addIngredient(event.currentTarget.parent)})
        menuDiv.appendChild(addBtn)
    } else {
        const addBtn = menuDiv.querySelector('button')
        if (addBtn) {
            menuDiv.removeChild(addBtn)
        }
    }
}
