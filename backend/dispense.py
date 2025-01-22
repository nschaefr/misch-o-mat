import time


def dispense_drink(ingredients):
    for ingredient_id, amount in ingredients.items():
        print(f"Ingredient {ingredient_id}: {amount} ml")

    time.sleep(5)
    # Hardware functions
    # id = Zahl, amount = Zahl
