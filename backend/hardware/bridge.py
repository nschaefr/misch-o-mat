import RPi.GPIO as GPIO
import time

LIN1 = 20
LIN2 = 21

pause_duration = 0.3

GPIO.setmode(GPIO.BCM)
GPIO.setup(LIN1, GPIO.OUT)
GPIO.setup(LIN2, GPIO.OUT)

def heranfahren():
    GPIO.output(LIN1, GPIO.LOW)
    GPIO.output(LIN2, GPIO.HIGH)
    time.sleep(pause_duration)
    GPIO.output(LIN1, GPIO.LOW)
    GPIO.output(LIN2, GPIO.LOW)

def wegfahren():
    GPIO.output(LIN1, GPIO.HIGH)
    GPIO.output(LIN2, GPIO.LOW)
    time.sleep(pause_duration)
    GPIO.output(LIN1, GPIO.LOW)
    GPIO.output(LIN2, GPIO.LOW)

