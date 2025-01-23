import RPi.GPIO as GPIO

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

def setup_gpio():
    GPIO.setmode(GPIO.BCM)

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