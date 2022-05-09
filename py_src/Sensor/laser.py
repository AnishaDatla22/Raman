

import serial
import time



def laser_start(serialPort):
    serialPort.write(b'e 1')
    ack = serialPort.read(3)
    print(ack)
    time.sleep(2)
    serialPort.write(b'e 0')
    ack = serialPort.read(3)
    print(ack)

def Setup_laser():
    com_port = input("Enter COM Port Number: ")
    serialPort = serial.Serial(port=com_port,baudrate=115200,bytesize=8,timeout=2)
    print(serialPort.name)
    laser_start(serialPort)


Setup_laser()
