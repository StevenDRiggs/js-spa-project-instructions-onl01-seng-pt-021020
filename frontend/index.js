const domain = 'http://localhost:3000'

document.addEventListener('DOMContentLoaded', loadIngredients)

function loadIngredients() {
    const menus = document.querySelector('div#menus')
//
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

            menus.appendChild(datatext)

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
                // ingItem.setAttribute('data-measure-id', ing.preferred_measure_id)
                ingItem.textContent = ing.name

                datalist.appendChild(ingItem)
            })

            menus.appendChild(datalist)
        })
        .then(loadQuantities)
}

function loadQuantities() {
    const menus = document.querySelector('div#menus')
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

            menus.appendChild(datatext)

            const datalist = document.createElement('datalist')
            datalist.id = 'quantities'
            
            const quantities = Array.from(json)
            quantities.forEach(quantity => {
                const quantityItem = document.createElement('option')
                // quantityItem.value = quantity.id
                quantityItem.textContent = quantity.quantity

                datalist.appendChild(quantityItem)
            })

            menus.appendChild(datalist)
        })
        .then(loadMeasures)
}

function loadMeasures() {
    const menus = document.querySelector('div#menus')
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

            menus.appendChild(datatext)

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
                // measureItem.setAttribute('data-id', measure.id)
                measureItem.textContent = measure.measure

                datalist.appendChild(measureItem)
            })

            menus.appendChild(datalist)
        })
}

function setMeasure() {
    let ingredient = document.querySelector('input#ingredient-text').value
    ingredient = ingredient.split(/\s+/).join('-')
    
    fetch(`${domain}/measures/${ingredient}`)
        .then(response => response.json())
        .then(json => {
            if (json !== '') {
                const measure = document.querySelector('input#measure-text')
                measure.value = json.measure
            }
        })
}