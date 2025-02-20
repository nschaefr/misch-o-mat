import time
from hardware.stepper import home_stepper
from hardware.bridge import drive_away
from hardware.pump import pump_off


def reset():
    pump_off()
    time.sleep(1)
    drive_away()
    time.sleep(1)
    home_stepper()
    print("Hardware reset")
