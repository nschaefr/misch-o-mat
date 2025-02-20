import RPi.GPIO as GPIO
from hx711 import HX711
from config.setup import ratio

# Button
BUTTON_PIN = 26

# Stepper
DIR_PIN = 7
STEP_PIN = 8
ENABLE_PIN = 25
ENDSTOP_PIN = 12

# Bridge
LIN1 = 20
LIN2 = 21

# Pump
PUMP_PIN = 16

hx = HX711(dout_pin=23, pd_sck_pin=24, gain_channel_A=64)


def setup_gpio():
    GPIO.setmode(GPIO.BCM)

    hx = HX711(dout_pin=23, pd_sck_pin=24, gain_channel_A=64)
    hx.zero(1)
    hx.set_scale_ratio(ratio)

    # Button
    GPIO.setup(BUTTON_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

    # Stepper
    GPIO.setup(DIR_PIN, GPIO.OUT)
    GPIO.setup(STEP_PIN, GPIO.OUT)
    GPIO.setup(ENABLE_PIN, GPIO.OUT)
    GPIO.setup(ENDSTOP_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.output(ENABLE_PIN, GPIO.LOW)

    # Bridge
    GPIO.setup(LIN1, GPIO.OUT)
    GPIO.setup(LIN2, GPIO.OUT)

    # Pump
    GPIO.setup(PUMP_PIN, GPIO.OUT)


def clean_gpio():
    GPIO.cleanup()
