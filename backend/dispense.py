import time
import json
from hardware.setup import setup_gpio, clean_gpio
from hardware.stepper import move_to_hole, home_stepper
from hardware.bridge import drive_up, drive_away 
from hardware.pump import pump_off, pump_on
from hardware.scale import scale, calibrate, tare

def load_liquids_database(file_path="/home/misch-o-mat/misch-o-mat/backend/database/liquids.json"):
    with open(file_path, "r") as file:
        return json.load(file)

def dispense_drink(ingredients):
    start_position = 0
    liquids_data = load_liquids_database()

    for ingredient_id, amount in ingredients.items():
        target_position = liquids_data[ingredient_id]["anschlussplatz"]

        tare()
        
        move_to_hole(start_position, target_position)
        time.sleep(1/2)
        drive_up()
        time.sleep(1)
        pump_on()

        scale(amount, False)

        pump_off()
        time.sleep(1)
        drive_away()
        time.sleep(1/2)
        start_position = target_position

    home_stepper()

