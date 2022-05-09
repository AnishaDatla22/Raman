from ctypes import *
from Sensor.DcIcUSB import *
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import time

DcIc_lib = cdll.LoadLibrary("Sensor\Dependencies\DcIcUSB.dll")

class CCD:

    nDevID = 0
    ccd_df = pd.DataFrame()
    pFilename = "Sample.csv"
    cPixels = c_long(0)
    cLines = c_long(0)
    #User Defined
    cFrameCount =  c_long(0)
    nLineCount = 3
    nGain = 1
    nOffset = 306
    nPixelCount = 32
    nPulseTime = 1000

    def Close_CCD(self):
        bValue = False
        bStat = DcIc_lib.DcIc_SetLEDMode(nDevID, bValue)
        DcIc_lib.DcIc_Disconnect(nDevID)
        DcIc_lib.DcIc_Terminate()
        print("Closed")

    def Save_CCD_Data(self,pDataBuffer):

        frame = []
        i = 0
        for f in range(0,cFrameCount.value):
            for h in range(0,cLines.value):
                pixel = []
                for w in range(0,cPixels.value):
                    pixel.append(int.from_bytes(pDataBuffer[i:i+2],byteorder='little'))  #check if big or little
                    i = i+2
                frame.append(pixel)

        ccd_df = pd.DataFrame(list(frame)) #Convert to df
        ccd_df = ccd_df.T
        ccd_df['PixelNo'] = ccd_df.index
        ccd_df.to_csv(pFilename)

    def Plot_CCD_Data(self):
        Lines = [x for x in range(0,LineCount)]
        ccd_df.plot(kind='line',x='PixelNo',y=Lines)
        plt.title('PIXEL GRAPH')
        plt.xlabel('Pixel No')
        plt.ylabel('ADU')
        plt.show()

    def Connect_CCD(self):
        bStat = DcIc_lib.DcIc_Initialize()
        if (bStat != 1):
            return DcIc_ERROR_INITIALIZE                  # Initialize is failed

        lDevCount = c_long(0)
        bStat = DcIc_lib.DcIc_CreateDeviceInfo(byref(lDevCount))
        print("DevCount: "+str(lDevCount.value))
        if (bStat != 1):
            DcIc_lib.DcIc_Terminate()
            return 0

        unTargetDevIdx = c_int(0)
        nDevID = DcIc_lib.DcIc_Connect(unTargetDevIdx)
        print("nDevID: "+str(nDevID))
        if (nDevID <= 0):
            DcIc_lib.DcIc_Terminate()
            return DcIc_ERROR_CONNECT

        bStat = DcIc_lib.DcIc_Abort(nDevID)
        if (bStat == 0):
            Close_CCD(nDevID)
            return 0

        #*********************************
        # SET CAMERA PARAMETERS
        #********************************
        bValue = True
        bStat = DcIc_lib.DcIc_SetLEDMode(nDevID, bValue)
        if (bStat == 0):
            Close_CCD(nDevID)
            return 0

        btValue = c_byte(0)	                                   # Set trigger mode:Internal Sync Mode
        bStat = DcIc_lib.DcIc_SetTriggerMode(nDevID, btValue)
        if (bStat == 0):
            #change trigger mode is failed
            Close_CCD(nDevID)
            return 0


        bValue = True	                              #Set trigger polarity: High Active
        bStat = DcIc_lib.DcIc_SetTriggerPolarity(nDevID, bValue)
        if (bStat == 0):
            Close_CCD(nDevID)
            return 0

        bValue = False	                                  # Set trigger effective: Disable
        bStat = DcIc_lib.DcIc_SetTriggerEffective(nDevID, bValue)
        if (bStat == 0):                               # Change trigger effective is failed
            Close_CCD(nDevID)
            return 0

    def Capture_CCD(self):

        bStat = DcIc_lib.DcIc_SetStartPulseTime(nDevID, nPulseTime)
        bStat = DcIc_lib.DcIc_SetGain(nDevID, nGain)
        bStat = DcIc_lib.DcIc_SetOffset(nDevID, nOffset)
        bStat = DcIc_lib.DcIc_SetVerticalPixel(nDevID, nPixelCount)
        if (bStat == 0):
            Close_CCD(nDevID)
            return 0

        ulTotalPixels = c_long(0)

        bStat = DcIc_lib.DcIc_GetHorizontalPixel(nDevID, byref(cPixels))
        if (bStat == 0):
            Close_CCD(nDevID)
            return 0
        bStat = DcIc_lib.DcIc_GetVerticalPixel(nDevID, byref(cLines))
        if (bStat == 0):
            Close_CCD(nDevID)
            return 0

        print("Vertical Pixel: " + str(cLines.count))
        bStat = DcIc_lib.DcIc_SetVerticalBinning(nDevID,cLines.count)
        if (bStat == 0):
            Close_CCD(nDevID)
            return 0

        ulTotalPixels = cFrameCount.value * cLines.value * cPixels.value
        print("ulTotalPixels: " + str(ulTotalPixels))

        pDataBuff = create_string_buffer(ulTotalPixels * 2)   # each pixel is a c_long type # ADU is 16bit
        print("Size of pDataBuff: " + str(sizeof(pDataBuff)))

        # Start Acquisition

        bStat = DcIc_lib.DcIc_Capture(nDevID, pDataBuff, ulTotalPixels * 2)
        if (bStat == 0):   #change to 0 # Capture start failed -> Exit this function
            if (sizeof(pDataBuff) != 0):
                del pDataBuff
            Close_CCD(nDevID)
            return 0

        # Wait to complete the capture image
        nRsltStat = DcIc_WAITSTATUS_CAPTURING

        while (True):
            time.sleep(1)
            nRsltStat = DcIc_lib.DcIc_Wait(nDevID)
            if (nRsltStat == DcIc_WAITSTATUS_CAPTURED): # Data process
                Save_CCD_Data(pDataBuff)
                break

        Plot_CCD_Data()
