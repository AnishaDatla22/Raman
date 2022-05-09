from ccd_driver import *


detector = CCD()

detector.cFrameCount.value = 10
print(detector.cFrameCount.value)
status = detector.Connect_CCD()
if status == 0:
    detector.Capture_CCD()
print("Connect Status: "+str(status))
