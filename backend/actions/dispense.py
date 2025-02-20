import json
from hardware.stepper import move_to_hole, home_stepper
from hardware.bridge import drive_up, drive_away
from hardware.pump import pump_off, pump_on
from hardware.scale import scale, tare


def load_liquids_database(file_path="/home/misch-o-mat/misch-o-mat/backend/database/liquids.json"):
    with open(file_path, "r") as file:
        return json.load(file)


def dispense_drink(ingredients):
    start_position = 0
    liquids_data = load_liquids_database()

    try:
        for ingredient_id, amount in ingredients.items():
            target_position = liquids_data[ingredient_id]["anschlussplatz"]

            tare()
            move_to_hole(start_position, target_position)
            drive_up()

            pump_on()
            scale(amount, trailing=False)
            pump_off()

            start_position = target_position

    except Exception as e:
        print(f"Error during dispensing: {str(e)}")
    finally:
        drive_away()
        pump_off()

    home_stepper()
    print("Dispensing finished")
