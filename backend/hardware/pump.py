import RPi.GPIO as GPIO

PUMP_PIN = 16


def pump_on():
    try:
        GPIO.output(PUMP_PIN, GPIO.HIGH)
        print("Pump on")
    except Exception as e:
        print(f"Error while turning pump on: {str(e)}")


def pump_off():
    try:
        GPIO.output(PUMP_PIN, GPIO.LOW)
        print("Pump off")
    except Exception as e:
        print(f"Error while turning pump off: {str(e)}")
