import RPi.GPIO as GPIO
import time

LIN1 = 20
LIN2 = 21

pause_duration = 0.3


def drive_up():
    try:
        GPIO.output(LIN1, GPIO.LOW)
        GPIO.output(LIN2, GPIO.HIGH)
        time.sleep(pause_duration)
        GPIO.output(LIN1, GPIO.LOW)
        GPIO.output(LIN2, GPIO.LOW)
        print("Drive up")
    except Exception as e:
        print(f"Error during driving up: {str(e)}")


def drive_away():
    try:
        GPIO.output(LIN1, GPIO.HIGH)
        GPIO.output(LIN2, GPIO.LOW)
        time.sleep(pause_duration)
        GPIO.output(LIN1, GPIO.LOW)
        GPIO.output(LIN2, GPIO.LOW)
        print("Drive away")
    except Exception as e:
        print(f"Error during driving away: {str(e)}")
