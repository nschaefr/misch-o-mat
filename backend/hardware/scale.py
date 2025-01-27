import RPi.GPIO as GPIO
from hx711 import HX711    
import math

GPIO.setmode(GPIO.BCM)
hx = HX711(dout_pin=23, pd_sck_pin=24, gain_channel_A=64)
hx.zero()
ratio = -583.2848837209302 # Default for 64 Gain
hx.set_scale_ratio(ratio)

def tare():
    hx.zero(1)
    print("tared")

def calibrate(known_weight):
    input("Put on weight:")
    reading = hx.get_data_mean(100)
    ratio=(reading/float(known_weight))
    hx.set_scale_ratio(ratio)
    print(ratio)

def scale(target_weight, trailing):
    weight = 0
    previous_weight = 0
    max_increase = 100
    
    while weight < target_weight:
        current_weight = hx.get_weight_mean(1)
        current_weight = current_weight
        
        if not trailing:
            if abs(current_weight - previous_weight) <= max_increase:
                weight = current_weight
                previous_weight = weight
                print(weight)       
        else:
            weight = current_weight
            previous_weight = weight
            print(weight) 