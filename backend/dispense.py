import time
import json
from hardware.setup import setup_gpio, clean_gpio
from hardware.stepper import move_to_hole, home_stepper
from hardware.bridge import drive_up, drive_away 
from hardware.pump import pump_off, pump_on

def load_liquids_database(file_path="database/liquids.json"):
    with open(file_path, "r") as file:
        return json.load(file)

def dispense_drink(ingredients):
    start_position = 0
    liquids_data = load_liquids_database()

    for ingredient_id, amount in ingredients.items():
        target_position = liquids_data[ingredient_id]["anschlussplatz"]

        move_to_hole(start_position, target_position)
        time.sleep(1/2)
        drive_up()
        time.sleep(1)
        pump_on()
        time.sleep(8)
        pump_off()
        time.sleep(1)
        drive_away()
        time.sleep(1/2)
        start_position = target_position

    home_stepper()

if __name__ == "__main__":
    setup_gpio() # needs to be called at server start
    ingredients = {
        "2": 200
    }
    dispense_drink(ingredients)
    clean_gpio() # needs to be called at server shutdown

