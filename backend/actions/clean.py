import time
from hardware.stepper import move_to_hole, home_stepper
from hardware.bridge import drive_up, drive_away
from hardware.pump import pump_on, pump_off


def clean_all_positions():
    start_position = 0
    total_positions = 20

    try:
        for target_position in range(total_positions):
            move_to_hole(start_position, target_position)
            drive_up()

            print(f"Cleaning position {target_position}")
            pump_on()
            time.sleep(3)
            pump_off()

            drive_away()
            start_position = target_position

    except Exception as e:
        print(f"Error during cleaning: {str(e)}")
    finally:
        drive_away()
        pump_off()

    home_stepper()
    print("Cleaning finished")
