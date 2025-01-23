import RPi.GPIO as GPIO

PUMP_PIN = 16  # Pin, an dem das Relais oder der MOSFET angeschlossen ist

def pump_on():
        # Pumpe einschalten
        GPIO.output(PUMP_PIN, GPIO.HIGH)  # 5 Sekunden lang an

def pump_off():
      GPIO.output(PUMP_PIN, GPIO.LOW)