import RPi.GPIO as GPIO

PUMP_PIN = 16


def pump_on():
    GPIO.output(PUMP_PIN, GPIO.HIGH)
    print("Pump on")


def pump_off():
    GPIO.output(PUMP_PIN, GPIO.LOW)
    print("Pump off")
