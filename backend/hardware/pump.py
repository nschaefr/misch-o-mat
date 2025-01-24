import RPi.GPIO as GPIO

PUMP_PIN = 16  # Pin, an dem das Relais oder der MOSFET angeschlossen ist
rohwert_leer = -102730
rohwert_gewicht = -203138.7
CALIBRATION_FACTOR = (-203138.7+102730)/172 # (Rohwert_leer - Rohwert_gewicht)/172 (172 = iPhone 14)


def pump_on():
        GPIO.output(PUMP_PIN, GPIO.HIGH)  # 5 Sekunden lang an

def pump_off():
      GPIO.output(PUMP_PIN, GPIO.LOW)