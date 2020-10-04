# this list adapted from https://www.allrecipes.com/article/the-perfect-pantry/

Ingredient.destroy_all()
Measure.destroy_all()
Quantity.destroy_all()

pinch = Measure.create(
  measure: 'pinch',
  divisible: false
)
to_taste = Measure.create(
  measure: 'to taste',
  divisible: false
)
tbsp = Measure.create(
  measure: 'tbsp',
  divisible: true
)
fl_oz = Measure.create(
  measure: 'fl oz',
  divisible: true
)
dry_cup = Measure.create(
  measure: 'dry cup',
  divisible: true
)
wet_cup = Measure.create(
  measure: 'wet cup',
  divisible: true
)
can_5_oz = Measure.create(
  measure: 'can (5 oz)',
  divisible: true
)
can_6_oz = Measure.create(
  measure: 'can (6 oz)',
  divisible: true
)
can_14_oz = Measure.create(
  measure: 'can (14.5 oz)',
  divisible: true
)
can_15_oz = Measure.create(
  measure: 'can (15 oz)',
  divisible: true
)
can_15_5_oz = Measure.create(
  measure: 'can (15.5 oz)',
  divisible: true
)
can_28_oz = Measure.create(
  measure: 'can (28 oz)',
  divisible: true
)
can_29_oz = Measure.create(
  measure: 'can (29 oz)',
  divisible: true
)
jar_24_oz = Measure.create(
  measure: 'jar (24 oz)',
  divisible: true
)
lb = Measure.create(
  measure: 'lb',
  divisible: true
)
bunch_long_pasta = Measure.create(
  measure: 'bunch (long pasta)',
  divisible: false
)
oz = Measure.create(
  measure: 'oz',
  divisible: true
)
unit = Measure.create(
  measure: 'unit',
  divisible: false
)
clove = Measure.create(
  measure: 'clove',
  divisible: false
)
tsp = Measure.create(
  measure: 'tsp',
  divisible: true
)
dash = Measure.create(
  measure: 'dash',
  divisible: false
)
stick = Measure.create(
  measure: 'stick',
  divisible: false
)
stick_8_oz = Measure.create(
  measure: 'stick (8 oz)',
  divisible: true
)
cob = Measure.create(
  measure: 'cob',
  divisible: true
)

Ingredient.create(
  name: 'salt',
  preferred_measure: pinch
)

Ingredient.create(
  name: 'pepper',
  preferred_measure: to_taste
)

Ingredient.create(
  name: 'olive oil',
  preferred_measure: tbsp
)

Ingredient.create(
  name: 'vegetable oil',
  preferred_measure: tbsp
)

Ingredient.create(
  name: 'all-purpose flour',
  preferred_measure: dry_cup
)

Ingredient.create(
  name: 'granulated sugar',
  preferred_measure: dry_cup
)

Ingredient.create(
  name: 'chicken stock',
  preferred_measure: wet_cup
)

Ingredient.create(
  name: 'chicken broth',
  preferred_measure: wet_cup
)

Ingredient.create(
  name: 'beef stock',
  preferred_measure: wet_cup
)

Ingredient.create(
  name: 'beef broth',
  preferred_measure: wet_cup
)

Ingredient.create(
  name: 'canned tomatoes',
  preferred_measure: can_14_oz
)

Ingredient.create(
  name: 'tomato sauce',
  preferred_measure: jar_24_oz
)

Ingredient.create(
  name: 'tomato paste',
  preferred_measure: can_6_oz
)

Ingredient.create(
  name: 'canned white beans',
  preferred_measure: can_15_5_oz
)

Ingredient.create(
  name: 'dry white beans',
  preferred_measure: lb
)

Ingredient.create(
  name: 'canned black beans',
  preferred_measure: can_15_5_oz
)

Ingredient.create(
  name: 'dry black beans',
  preferred_measure: lb
)

Ingredient.create(
  name: 'canned red kidney beans',
  preferred_measure: can_15_5_oz
)

Ingredient.create(
  name: 'dry red kidney beans',
  preferred_measure: lb
)

Ingredient.create(
  name: 'canned tuna',
  preferred_measure: can_5_oz
)

Ingredient.create(
  name: 'tuna steak',
  preferred_measure: lb
)

Ingredient.create(
  name: 'pasta (spaghetti)',
  preferred_measure: bunch_long_pasta
)

Ingredient.create(
  name: 'dry rice',
  preferred_measure: dry_cup
)

Ingredient.create(
  name: 'lentils',
  preferred_measure: dry_cup
)

Ingredient.create(
  name: 'dry split peas',
  preferred_measure: dry_cup
)

Ingredient.create(
  name: 'bread crumbs',
  preferred_measure: dry_cup
)

Ingredient.create(
  name: 'fresh onion',
  preferred_measure: unit
)

Ingredient.create(
  name: 'potato',
  preferred_measure: unit
)

Ingredient.create(
  name: 'fresh garlic',
  preferred_measure: clove
)

Ingredient.create(
  name: 'vinegar',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'soy sauce',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'teriyaki sauce',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'Worcestershire sauce',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'hot sauce',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'dried basil',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'bay leaf',
  preferred_measure: unit
)

Ingredient.create(
  name: 'cayenne powder',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'crushed red pepper flakes',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'curry powder',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'seasoned (seasoning) salt',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'chili powder',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'cumin',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'cinnamon powder',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'cinnamon stick',
  preferred_measure: unit
)

Ingredient.create(
  name: 'garlic powder',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'onion powder',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'oregano',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'paprika',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'dried parsley',
  preferred_measure: dash
)

Ingredient.create(
  name: 'egg',
  preferred_measure: unit
)

Ingredient.create(
  name: 'egg white (unit)',
  preferred_measure: unit
)

Ingredient.create(
  name: 'egg white (fl oz)',
  preferred_measure: fl_oz
)

Ingredient.create(
  name: 'egg yolk',
  preferred_measure: unit
)

Ingredient.create(
  name: 'milk',
  preferred_measure: wet_cup
)

Ingredient.create(
  name: 'butter',
  preferred_measure: stick_8_oz
)

Ingredient.create(
  name: 'margarine',
  preferred_measure: tbsp
)

Ingredient.create(
  name: 'shortening',
  preferred_measure: wet_cup
)

Ingredient.create(
  name: 'ketchup (catsup)',
  preferred_measure: tbsp
)

Ingredient.create(
  name: 'mustard',
  preferred_measure: tsp
)

Ingredient.create(
  name: 'mayonnaise',
  preferred_measure: wet_cup
)

Ingredient.create(
  name: 'cheese',
  preferred_measure: oz
)

Ingredient.create(
  name: 'frozen corn',
  preferred_measure: dry_cup
)

Ingredient.create(
  name: 'corn-on-the-cob',
  preferred_measure: cob
)

Ingredient.create(
  name: 'frozen spinach',
  preferred_measure: oz
)

Ingredient.create(
  name: 'frozen peas',
  preferred_measure: dry_cup
)

Ingredient.create(
  name: 'ground beef',
  preferred_measure: lb
)

Ingredient.create(
  name: 'chicken breast',
  preferred_measure: unit
)

Ingredient.create(
  name: 'chicken thigh',
  preferred_measure: unit
)

Ingredient.create(
  name: 'chicken',
  preferred_measure: lb
)

Quantity.create(quantity: '1/8')
Quantity.create(quantity: '1/4')
Quantity.create(quantity: '1/2')
Quantity.create(quantity: '3/4')
Quantity.create(quantity: '1/3')
Quantity.create(quantity: '2/3')
