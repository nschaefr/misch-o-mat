from hardware.stepper import home_stepper
from hardware.bridge import drive_away
from hardware.pump import pump_off


def reset():
    pump_off()
    drive_away()
    home_stepper()
