import time
from hardware.stepper import move_to_hole, home_stepper
from hardware.bridge import drive_up, drive_away
from hardware.pump import pump_on, pump_off


def clean_position(position):
    try:
        move_to_hole(0, position)
        drive_up()

        print(f"Cleaning position {position}")
        pump_on()
        time.sleep(10)
        pump_off()

        drive_away()
        home_stepper()

    except Exception as e:
        print(f"Error during cleaning: {str(e)}")
        pump_off()
        drive_away()

    print(f"Cleaning of Position {position} finished")
