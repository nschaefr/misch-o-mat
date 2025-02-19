import RPi.GPIO as GPIO
import time

LIN1 = 20
LIN2 = 21

pause_duration = 0.3


def drive_up():
    GPIO.output(LIN1, GPIO.LOW)
    GPIO.output(LIN2, GPIO.HIGH)
    time.sleep(pause_duration)
    GPIO.output(LIN1, GPIO.LOW)
    GPIO.output(LIN2, GPIO.LOW)
    print("Drive up")


def drive_away():
    GPIO.output(LIN1, GPIO.HIGH)
    GPIO.output(LIN2, GPIO.LOW)
    time.sleep(pause_duration)
    GPIO.output(LIN1, GPIO.LOW)
    GPIO.output(LIN2, GPIO.LOW)
    print("Drive away")
