from hardware.setup import setup_gpio, clean_gpio
from hardware.pump import pump_off, pump_on

if __name__ == "__main__":
    setup_gpio() # needs to be called at server start
    pump_off()
    clean_gpio() # needs to be called at server shutdown

