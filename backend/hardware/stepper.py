import time
import RPi.GPIO as GPIO
from .bridge import wegfahren, heranfahren

DIR_PIN = 7
STEP_PIN = 8
ENABLE_PIN = 25
ENDSTOP_PIN = 12

steps_per_revolution = 3200
steps_per_hole = 160 # 3200/360 = 8,89 Schritte pro Grad /// 360/20 = 18 Grad pro Loch /// 18 * 8,89 = 160

def home_stepper():
    GPIO.output(DIR_PIN, GPIO.LOW)
    while GPIO.input(ENDSTOP_PIN) == GPIO.HIGH:
        GPIO.output(STEP_PIN, GPIO.HIGH)
        time.sleep(0.001)
        GPIO.output(STEP_PIN, GPIO.LOW)
        time.sleep(0.001)

    GPIO.output(DIR_PIN, GPIO.HIGH)
    
    for i in range(55):
        GPIO.output(STEP_PIN, GPIO.HIGH)
        time.sleep(0.001)
        GPIO.output(STEP_PIN, GPIO.LOW)
        time.sleep(0.001)

def map_position(input_position):
    if 1 <= input_position <= 9:
        return input_position + 4
    elif 10 <= input_position <= 14:
        return input_position - 10
    elif 15 <= input_position <= 19:
        return input_position - 1
    else:
        return 0
    
def move_to_hole(start, target):
    start_position = map_position(start)
    target_position = map_position(target)

    target_steps = (target_position - start_position) * steps_per_hole
    
    if target_steps >= 0:
        GPIO.output(DIR_PIN, GPIO.HIGH)
    else:
        GPIO.output(DIR_PIN, GPIO.LOW)

    for i in range(abs(target_steps)):
        if GPIO.input(ENDSTOP_PIN) == GPIO.LOW:
            home_stepper()
            return
        GPIO.output(STEP_PIN, GPIO.HIGH)
        time.sleep(0.001)
        GPIO.output(STEP_PIN, GPIO.LOW)
        time.sleep(0.001)
    
