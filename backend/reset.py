from hardware.setup import setup_gpio, clean_gpio
from hardware.stepper import home_stepper
from hardware.bridge import drive_away 


def reset():
    drive_away()
    home_stepper()

