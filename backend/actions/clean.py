import time
from hardware.stepper import move_to_hole, home_stepper, map_position
from hardware.bridge import drive_up, drive_away
from hardware.pump import pump_on, pump_off


def clean_position(position):
    target_position = map_position(position)

    try:
        move_to_hole(0, target_position)
        drive_up()

        print(f"Cleaning position {target_position}")
        pump_on()
        time.sleep(6)
        pump_off()

        drive_away()
        home_stepper()

    except Exception as e:
        print(f"Error during cleaning: {str(e)}")
        pump_off()
        drive_away()

    print(f"Cleaning of Position {target_position} finished")
