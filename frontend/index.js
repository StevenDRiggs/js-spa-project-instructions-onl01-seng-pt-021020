Object.prototype.last = function () {
    return this[this.length - 1]
}


class Meta {
    static all(klass) {
        return klass._all
    }

    static findById(klass, id) {
        return klass.all.find(instance => instance.id === id)
    }

    static findBy(klass, attr, val) {
        return klass.all.find(instance => instance[attr] === val)
    }
}

class Measure extends Meta {
    constructor(id, measure, divisible) {
        super()
        this.id = id
        this.measure = measure
        this.divisible = divisible

        Measure._all.push(this)
    }

    static get all() {
        return super.all(this)
    }

    static findById(id) {
        return super.findById(this, id)
    }

    static findBy(attr, val) {
        return super.findBy(this, attr, val)
    }
}
Measure._all = []

class Quantity extends Meta {
    constructor(id, quantity) {
        super()
        this.id = id
        this.quantity = quantity

        Quantity._all.push(this)
    }

    static get all() {
        return super.all(this)
    }

    static findById(id) {
        return super.findById(this, id)
    }

    static findBy(attr, val) {
        return super.findBy(this, attr, val)
    }
}
Quantity._all = []

class Ingredient extends Meta {
    constructor(id, name, preferredMeasureId) {
        super()
        this.id = id
        this.name = name
        this.preferredMeasure = Measure.findById(preferredMeasureId)

        Ingredient._all.push(this)
    }

    static get all() {
        return super.all(this)
    }

    static findById(id) {
        return super.findById(this, id)
    }

    static findBy(attr, val) {
        return super.findBy(this, attr, val)
    }
}
Ingredient._all = []


const domain = 'http://localhost:3000'

document.addEventListener('DOMContentLoaded', loadIngredients)

function loadIngredients() {
    Measure._all = []
    Quantity._all = []
    Ingredient._all = []

    fetch(`${domain}/measures`)
        .then(response => response.json())
        .then(json => {Array.from(json).forEach(measure => {new Measure(measure.id, measure.measure, measure.divisible)})})
        .then(() => {
            fetch(`${domain}/ingredients`)
                .then(response => response.json())
                .then(json => {Array.from(json).forEach(ingredient => {new Ingredient(ingredient.id, ingredient.name, ingredient.preferred_measure_id)})}) // preferred_measure_id must be snake_case here for compatibility
                .then(() => {
                    fetch(`${domain}/quantities`)
                        .then(response => response.json())
                        .then(json => {Array.from(json).forEach(quantity => {new Quantity(quantity.id, quantity.quantity)})})
                        .then(buildMenus)
                })
        })
}

function buildMenus() {
    const ingredientMenus = document.querySelector('div.ingredient-menus').parentElement.children.last()

    buildIngredients(ingredientMenus)
    buildQuantities(ingredientMenus)
    buildMeasures(ingredientMenus)
    addServings()
}

function buildIngredients(ingredientMenus) {
    const ingredients = Ingredient.all.sort((ing1, ing2) => {
        if (ing1.name < ing2.name) {
            return -1
        } else {
            return 1
        }
    })

    const datatext = document.createElement('input')
    datatext.type = 'text'
    datatext.name = 'ingredients'
    datatext.id = 'ingredient-text'
    datatext.setAttribute('list', 'ingredients')
    datatext.placeholder = 'Ingredient'
    datatext.addEventListener('change', event => {
        setMeasure(event.currentTarget.parentElement)
        addIngredientButton(event.currentTarget.parentElement)
    })

    ingredientMenus.appendChild(datatext)

    const datalist = document.createElement('datalist')
    datalist.id = 'ingredients'

    ingredients.forEach(ingredient => {
        const ingItem = document.createElement('option')
        ingItem.textContent = ingredient.name

        datalist.appendChild(ingItem)
    })

    ingredientMenus.appendChild(datalist)
}

function buildQuantities(ingredientMenus) {
    const quantities = Quantity.all

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

    quantities.forEach(quantity => {
        const quantityItem = document.createElement('option')
        quantityItem.textContent = quantity.quantity

        datalist.appendChild(quantityItem)
    })

    ingredientMenus.appendChild(datalist)
}

function buildMeasures(ingredientMenus) {
    const measures = Measure.all.sort((measure1, measure2) => {
        if (measure1.measure < measure2.measure) {
            return -1
        } else {
            return 1
        }
    })

    const datatext = document.createElement('input')
    datatext.type = 'text'
    datatext.name = 'measures'
    datatext.id = 'measure-text'
    datatext.setAttribute('list', 'measures')
    datatext.placeholder = 'Measurement'
    datatext.addEventListener('change', event => {
        setDivisible(event.currentTarget.parentElement)
        addIngredientButton(event.currentTarget.parentElement)
    })

    ingredientMenus.appendChild(datatext)

    const datalist = document.createElement('datalist')
    datalist.id = 'measures'
    datalist.name = 'measures'

    measures.forEach(measure => {
        const measureItem = document.createElement('option')
        measureItem.textContent = measure.measure

        datalist.appendChild(measureItem)
    })

    ingredientMenus.appendChild(datalist)

    const divisibleLabel = document.createElement('label')
    divisibleLabel.for = 'divisible'
    divisibleLabel.textContent = 'Divisible Unit?'

    ingredientMenus.appendChild(divisibleLabel) 

    const divisibleCheckBox = document.createElement('input')
    divisibleCheckBox.id = 'divisible'
    divisibleCheckBox.name = 'divisible'
    divisibleCheckBox.type = 'checkbox'

    ingredientMenus.appendChild(divisibleCheckBox)
}

function addServings() {
    let originalServings = document.querySelector('input#original-servings')
    let desiredServings = document.querySelector('input#desired-servings')
    const fieldset = document.querySelector('fieldset')

    if (!originalServings) {
        originalServings = document.createElement('input')
        originalServings.type = 'number'
        originalServings.name = 'original-servings'
        originalServings.id = 'original-servings'
        originalServings.placeholder = 'Makes # servings?'

        fieldset.appendChild(originalServings)
    } else {
        fieldset.removeChild(originalServings)
        fieldset.appendChild(originalServings)
    }

    if (!desiredServings) {
        desiredServings = document.createElement('input')
        desiredServings.type = 'number'
        desiredServings.name = 'desired-servings'
        desiredServings.id = 'desired-servings'
        desiredServings.placeholder = 'Want to make # servings'

        fieldset.appendChild(desiredServings)
    } else {
        fieldset.removeChild(desiredServings)
        fieldset.appendChild(desiredServings)
    }
}

function setMeasure(menuDiv) {
    let newIngredient = menuDiv.querySelector('input#ingredient-text').value
    newIngredient = Ingredient.findBy('name', newIngredient)

    if (newIngredient) {
        const preferredMeasure = newIngredient.preferredMeasure
        if (preferredMeasure) {
            const measure = menuDiv.querySelector('input#measure-text')
            measure.value = preferredMeasure.measure

            const divisible = menuDiv.querySelector('input#divisible')
            divisible.checked = preferredMeasure.divisible
        }
    }
}

function addIngredientButton(menuDiv) {
    if (!menuDiv.querySelector('button')) {
        const ingredient = menuDiv.querySelector('input#ingredient-text')
        const quantity = menuDiv.querySelector('input#quantity-text')
        const measure = menuDiv.querySelector('input#measure-text')

        if (ingredient.value && quantity.value && measure.value) {
            const addBtn = document.createElement('button')
            addBtn.textContent = 'Add Ingredient'
            addBtn.addEventListener('click', event => {
                event.preventDefault()
                addIngredient(event.currentTarget.parentElement)
            })
            menuDiv.appendChild(addBtn)
        } else {
            const addBtn = menuDiv.querySelector('button')
            if (addBtn) {
                menuDiv.removeChild(addBtn)
            }
        }
    }
}

function setDivisible(menuDiv) {
    const measureText = menuDiv.querySelector('input#measure-text').value
    const measure = Measure.findBy('measure', measureText)

    if (measure) {
        const divisible = menuDiv.querySelector('input#divisible')
        divisible.checked = !!measure.divisible
    }
}

function addIngredient(menuDiv) {
    const divisible = menuDiv.querySelector('input#divisible').checked
    const quantityText = menuDiv.querySelector('input#quantity-text').value
    const measureText = menuDiv.querySelector('input#measure-text').value
    const ingredientText = menuDiv.querySelector('input#ingredient-text').value

    const quantityObj = setQuantityObject(quantityText)
    const measureObj = setMeasureObject(measureText, divisible)
    const ingredientObj = setIngredientObject(ingredientText, measureObj)

    Promise.all([quantityObj, measureObj, ingredientObj])
    .then(([quantity, measure, ingredient]) => [quantity, measure, ingredient])
    .then(([quantity, measure, ingredient]) => {console.log(quantity, measure, ingredient)})
}

function setQuantityObject(quantityText) {
    return Quantity.findBy('quantity', quantityText) || fetch(`${domain}/quantities`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({quantity: {quantity: quantityText}})
    })
    .then(response => response.json())
    .then(json => {return new Quantity(json.id, json.quantity)})
}

function setMeasureObject(measureText, divisible) {
    return Measure.findBy('measure', measureText) || fetch(`${domain}/measures`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            measure: {
                measure: measureText,
                divisible: divisible
            }
        })
    })
    .then(response => response.json())
    .then(json => {return new Measure(json.id, json.measure, json.divisible)})
    .then(measure => {
        if (measure.divisible !== divisible) {
            measure.divisible = fetch(`${domain}/measures/${measure.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    measure: {
                        measure: measure.measure,
                        divisible: divisible
                    }
                })
            })
            .then(response => response.json())
            .then(json => json.divisible)
        }

        return measure
    })
}

function setIngredientObject(ingredientText, measureObj) {
    const ingredient = Ingredient.findBy('name', ingredientText) || fetch(`${domain}/ingredients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ingredient: {
                name: ingredientText,
                preferred_measure_id: measureObj.id
            }
        })
    })
    .then(response => response.json())
    .then(json => {return new Ingredient(json.id, json.name, json.preferred_measure_id)})

    Promise.all([ingredient])
    .then(([ingredient]) => {
        if (ingredient.preferredMeasure !== measureObj) {
            ingredient.preferred_measure_id = fetch(`${domain}/ingredients/${ingredient.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ingredient: {
                        name: ingredient.name,
                        preferred_measure_id: measureObj.id
                    }
                })
            })
            .then(response => response.json())
            .then(json => json.preferred_measure_id)
            
            ingredient.preferredMeasure = measureObj
        }
    })

    return ingredient
}

    // } else {
    // }

    // Array.from(menuDiv.children).forEach(child => {menuDiv.removeChild(child)})

    // const ingredientItem = document.createElement('p')

    // ingredientItem.innerHTML = `<span class="ingredient-name">${ingredientObj.name}</span> - <span class="ingredient-quantity">${quantityObj.quantity}</span> <span class="ingredient-measure">${measureObj.measure}</span>`

    // menuDiv.appendChild(ingredientItem)

    // const removeBtn = document.createElement('button')
    // removeBtn.textContent = 'Remove'
    // removeBtn.addEventListener('click', event => {
    //     event.preventDefault()
    //     removeIngredient(event.currentTarget.parentElement)
    // })

    // menuDiv.appendChild(removeBtn)

    // const newMenuDiv = document.createElement('div')
    // newMenuDiv.className = 'ingredient-menus'
    // menuDiv.parentElement.appendChild(newMenuDiv)

    // loadIngredients()

function removeIngredient(ingDiv) {
    ingDiv.parentElement.removeChild(ingDiv)
}
