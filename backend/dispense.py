import time

def dispense_drink(drink, strength, ingredients):
    print(f"Dispensing {drink["name"]} with strength {strength}")
    for ingredient_id, amount in ingredients.items():
        print(f"Ingredient {ingredient_id}: {amount} ml")
    
    time.sleep(5)
    # Hardware functions
