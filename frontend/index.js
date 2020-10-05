Object.prototype.last = function () {
    return this[this.length - 1]
}

String.prototype.strip = function () {
    return this.replace(/^\s+|\s+$/g, '')
}

String.prototype.toTitleCase = function () {
    const strArr = this.split(/\s+/)
    const titleized = strArr.map(word => {
        return word[0].toUpperCase() + word.slice(1)
    })

    return titleized.join(' ')
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
            .then(configureCalculateButton)
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
    divisibleCheckBox.addEventListener('change', event => {divisibleChange(event.currentTarget.parentElement)})

    ingredientMenus.appendChild(divisibleCheckBox)
}

//TODO: enable this to activate when other fields change it
function divisibleChange(menuDiv) {
    const divisible = menuDiv.querySelector('input#divisible').checked
    const quantities = menuDiv.querySelector('datalist#quantities')

    if (divisible) {
        Array.from(quantities.children).forEach(child => {quantities.removeChild(child)})
        Quantity.all.forEach(quantity => {
            const quantityItem = document.createElement('option')
            quantityItem.textContent = quantity.quantity

            quantities.appendChild(quantityItem)
        })
    } else {
        Array.from(quantities.children).forEach(child => {
            if (parseInt(child.textContent).toString() !== child.textContent) {
                quantities.removeChild(child)
            }
        })
    }
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

            divisibleChange(menuDiv)
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
    const quantityText = menuDiv.querySelector('input#quantity-text').value.strip()
    const measureText = menuDiv.querySelector('input#measure-text').value.strip().toLowerCase()
    const ingredientText = menuDiv.querySelector('input#ingredient-text').value.strip().toTitleCase()

    let quantityObj = Quantity.findBy('quantity', quantityText)
    let measureObj = Measure.findBy('measure', measureText)
    let ingredientObj = Ingredient.findBy('name', ingredientText)

    let update = false

    if (!quantityObj) {
        update = true
        quantityObj = new Quantity(null, quantityText)
    }

    if (!measureObj) {
        update = true
        measureObj = new Measure(null, measureText, divisible)
    } else {
        if (measureObj.divisible !== divisible) {
            update = true
            measureObj.divisible = divisible
        }
    }

    if (!ingredientObj) {
        update = true
        ingredientObj = new Ingredient(null, ingredientText, null)
    } else {
        if (!!measureObj.id && ingredientObj.preferredMeasureId !== measureObj.id) {
            update = true
            ingredientObj.preferredMeasureId = measureObj.id
        } else if (!measureObj.id) {
            update = true
        }
    }

    morphDiv(menuDiv, quantityText, measureText, ingredientText)

    if (update) {
        fetch(`${domain}/records_update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                divisible: divisible,
                quantity: quantityObj,
                measure: measureObj,
                ingredient: ingredientObj
            })
        })
        .then(loadIngredients)
    }
}

function morphDiv(menuDiv, quantityText, measureText, ingredientText) {
    Array.from(menuDiv.children).forEach(child => menuDiv.removeChild(child))
    menuDiv.classList.add('display')

    const p = document.createElement('p')
    p.innerHTML = `<span class="ingredient-display">${ingredientText}</span> - <span class="quantity-display">${quantityText}</span> <span class="measure-display">${measureText}</span>`

    const removeBtn = document.createElement('button')
    removeBtn.textContent = 'Remove'
    removeBtn.addEventListener('click', event => {
        event.preventDefault()
        removeIngredient(event.currentTarget.parentElement)
    })

    menuDiv.appendChild(p)
    menuDiv.appendChild(removeBtn)

    const divContainer = menuDiv.parentElement
    const newDiv = document.createElement('div')
    newDiv.className = 'ingredient-menus'

    divContainer.appendChild(newDiv)
}

//TODO: disable this until form is filled out
function configureCalculateButton() {
    const calcBtn = document.querySelector('button#calculate')
    calcBtn.addEventListener('click', event => {
        event.preventDefault()
        calculate()
    })
}

function calculate() {
    const recipeItems = []
    const recipe = Array.from(document.querySelectorAll('div.ingredient-menus')).slice(0, -1)
    const makesServings = document.querySelector('input#original-servings').value
    const desiredServings = document.querySelector('input#desired-servings').value

    recipe.forEach(item => {
        recipeItems.push({
            ingredient: item.querySelector('span.ingredient-display').textContent,
            quantity: item.querySelector('span.quantity-display').textContent,
            measure: item.querySelector('span.measure-display').textContent,
            divisible: Measure.findBy('measure', item.querySelector('span.measure-display').textContent).divisible
        })
    })

    fetch(`${domain}/calculate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            recipe: recipeItems,
            makes: makesServings,
            desired: desiredServings
        })
    })
    .then(response => response.json())
    .then(json => {console.log(JSON.stringify(json))})
}

function removeIngredient(ingDiv) {
    ingDiv.parentElement.removeChild(ingDiv)
}
