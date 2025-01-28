from hardware.setup import setup_gpio, clean_gpio
from hardware.stepper import home_stepper
from hardware.bridge import drive_away 


def reset():
    setup_gpio()
    drive_away()
    home_stepper()
    clean_gpio()

