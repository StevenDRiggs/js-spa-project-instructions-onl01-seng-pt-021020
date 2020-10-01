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
    constructor(id, measure) {
        super()
        this.id = id
        this.measure = measure

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
    constructor(id, name, divisible, preferred_measure_id) {
        super()
        this.id = id
        this.name = name
        this.divisible = divisible
        this.preferred_measure = Measure.findById(preferred_measure_id)

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
    fetch(`${domain}/measures`)
        .then(response => response.json())
        .then(json => {Array.from(json).forEach(measure => {new Measure(measure.id, measure.measure)})})
        .then(() => {
            fetch(`${domain}/ingredients`)
                .then(response => response.json())
                .then(json => {Array.from(json).forEach(ingredient => {new Ingredient(ingredient.id, ingredient.name, ingredient.divisible, ingredient.preferred_measure_id)})})
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
    datatext.addEventListener('change', setMeasure)
    datatext.addEventListener('change', event => {addIngredientButton(event.currentTarget.parentElement)})

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
    datatext.addEventListener('change', event => {addIngredientButton(event.currentTarget.parentElement)})

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

function setMeasure() {
    let newIngredient = document.querySelector('input#ingredient-text').value
    newIngredient = newIngredient.split(/\s+/).join('-')


    
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

//TODO: change to reflect OOJS & interact with db
function addIngredient(menuDiv) {
   const ingredient = menuDiv.querySelector('input#ingredient-text')
   const quantity = menuDiv.querySelector('input#quantity-text')
   const measure = menuDiv.querySelector('input#measure-text')
   const addBtn = menuDiv.querySelector('button')

   const addedIngredient = ingredient.value
   const addedQuantity = quantity.value
   const addedMeasure = measure.value

   Array.from(menuDiv.children).forEach(child => {menuDiv.removeChild(child)})

   const p = document.createElement('p')
   p.innerHTML = `<span class="ingredient">${addedIngredient}</span> <span class="quantity">${addedQuantity}</span> <span class="measure">${addedMeasure}`
   menuDiv.appendChild(p)

   const removeBtn = document.createElement('button')
   removeBtn.textContent = 'Remove'
   removeBtn.addEventListener('click', event => {
       event.preventDefault()
       removeIngredient(event.currentTarget.parentElement) 
   })
   menuDiv.appendChild(removeBtn)

   const newDiv = document.createElement('div')
   newDiv.className = 'ingredient-menus'
   menuDiv.parentElement.appendChild(newDiv)
    
   buildMenus()
}

function removeIngredient(ingDiv) {
       ingDiv.parentElement.removeChild(ingDiv)
}
