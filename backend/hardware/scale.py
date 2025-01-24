import RPi.GPIO as GPIO                # import GPIO
from hx711 import HX711    

GPIO.setmode(GPIO.BCM)
hx = HX711(dout_pin=23, pd_sck_pin=24)
hx.zero()
hx.set_scale_ratio(-1159.2093023255813)            # import the class HX711

def calibrate():
    input("Place known weight on scale: ")
    reading = hx.get_data_mean(100)

    known_weight = input("Enter know weight in grams: ")
    ratio=(reading/float(known_weight))
    hx.set_scale_ratio(ratio)
    print(ratio)

def scale(target_weight):
    weight = 0
    
    while weight < target_weight:
        weight = hx.get_weight_mean(1)
        print(weight)
        print(f"Target: {target_weight}")