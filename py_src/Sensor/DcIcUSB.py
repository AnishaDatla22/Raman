#---------------------------------------------------------------------------
# [Error Code]
#---------------------------------------------------------------------------
DcIc_ERROR_GOOD             =0							 # There is no error (normal termination
DcIc_ERROR_UNKNOWN			=1 							 # Unknown
DcIc_ERROR_INITIALIZE		=2 							 # Initialization is not done
DcIc_ERROR_PARAMETER		=3 							 # The parameter is illegal
DcIc_ERROR_CONNECT			=4 							 # The error occurred by the device connection
DcIc_ERROR_DISCONNECT		=5 							 # The error occurred by the device disconnection
DcIc_ERROR_SEND				=6 							 # This control doesn't correspond
DcIc_ERROR_RECEIVE			=7 							 # This control doesn't correspond
DcIc_ERROR_STOPRECEIVE		=8 							 # Fails in the data receive
DcIc_ERROR_CLOSE			=9 							 # Fails in the close
DcIc_ERROR_ALLOC			=10 						 # The memory allocation error occurred
DcIc_ERROR_CAPTURE			=11 						 # Fails in the data measurement
DcIc_ERROR_TIMEOUT			=12 						 # Timeout error

DcIc_ERROR_WRITEPROTECT		=20 						 #
DcIc_ERROR_ILLEGAL_ACCESS	=21 						 #
DcIc_ERROR_ILLEGAL_ADDR		=22 						 #
DcIc_ERROR_ILLEGAL_VALUE	=23 						 # The parameter is illegal

DcIc_WAITSTATUS_ERROR = 0						         # The error occured
DcIc_WAITSTATUS_CAPTURING = 1					         # During a measurement
DcIc_WAITSTATUS_CAPTURED = 2                             # Finished with a measurment
