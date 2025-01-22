import time
from hardware.setup import setup_gpio, clean_gpio
from hardware.stepper import move_to_hole, home_stepper


def dispense_drink(ingredients = None): # remove None
    start_position = 0
    setup_gpio()

    for ingredient_id, amount in ingredients.items():
        target_position = 8 # ingredient pos
        move_to_hole(start_position, target_position)
        start_position = target_position
        time.sleep(2) # pump and dispense

    home_stepper()
    clean_gpio()

if __name__ == "__main__":
    dispense_drink()

