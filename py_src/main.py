# -*- coding: utf-8 -*-
"""
Created on Mon Apr 19 13:42:04 2022

@author: Anisha
"""


from Setup import *
from Format_data import *
from Pretreatment import *
from Sensor.ccd_driver import *
from NIR_Software.authentication.auth import Auth
from NIR_Software.sensor.scan import Scan
from Analysis import *
from Models import *
from Parameters import *



app = FastAPI(title="Raman Spectroscopy",debug = True)


origins = [
    "http://localhost:8000",
    "http://localhost:8000/uploadFile",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
sensorOpen = 0

JSONObject = Dict[AnyStr, Any]
JSONArray = List[Any]
JSONStructure = Union[JSONArray, JSONObject]

if __name__ == '__main__':
    uvicorn.run("main:app",host="0.0.0.0",workers=1,port=8000)


#**********************************************************************************************
#-------------------------------Logging Functions-----------------------------------------
#**********************************************************************************************
class InterceptHandler(logging.Handler):
    """
    Default handler from examples in loguru documentaion.
    See https://loguru.readthedocs.io/en/stable/overview.html#entirely-compatible-with-standard-logging
    """

    def emit(self, record):
        # Get corresponding Loguru level if it exists
        try:
            level = logger.level(record.levelname).name
        except ValueError:
            level = record.levelno

        # Find caller from where originated the logged message
        frame, depth = logging.currentframe(), 2
        while frame.f_code.co_filename == logging.__file__:
            frame = frame.f_back
            depth += 1

        logger.opt(depth=depth, exception=record.exc_info).log(
            level, record.getMessage()
        )

def format_record(record: dict) -> str:
    """
    Custom format for loguru loggers.
    Uses pformat for log any data like request/response body during debug.
    Works with logging if loguru handler it.
    """
    format_string = LOGURU_FORMAT

    if record["extra"].get("payload") is not None:
        record["extra"]["payload"] = pformat(
            record["extra"]["payload"], indent=4, compact=True, width=88
        )
        format_string += "\n<level>{extra[payload]}</level>"

    format_string += "{exception}\n"
    return format_string

# set loguru format for root logger
logging.getLogger().handlers = [InterceptHandler()]
logger.configure(handlers=[{"sink": "logger.txt", "level": logging.DEBUG, "format": format_record}])
logging.getLogger("uvicorn.access").handlers = [InterceptHandler()]


@app.get("/")
def index(request: Request) -> None:
    logger.info("loguru log")
    logging.info("logging log")

    logging.getLogger("fastapi").debug("fatapi info log")
    logger.bind(payload=dict(request.query_params)).debug("params with formating")
    return None


#**********************************************************************************************
#-------------------------------PreTreatment Functions-----------------------------------------
#**********************************************************************************************
@app.post("/SNV",tags=['Transform Algorithms'])
def tr_algo_sn(parentName:str, childName:str, sample:str, inputf: JSONStructure = None):
        SNV = snv()
        final_out,final_out_table = PT_scatter_correction(parentName, childName, sample,SNV,'T_SNV', inputf)
        return {'snv':final_out,'table':final_out_table}

@app.post("/MSC",tags=['Transform Algorithms'])
def tr_algo_msc(parentName:str, childName:str, sample:str, inputf: JSONStructure = None):
        MSC = msc()
        final_out,final_out_table = PT_scatter_correction(parentName, childName, sample,MSC,'T_MSC', inputf)
        return {'msc':final_out,'table':final_out_table}


@app.post("/savitzkyGolay",tags=['Spectral Pretreatment Controller'])
def savitzky_golay(parentName:str, childName:str, sample:str,derivative:int =2,polynomial:int=2,window:int =11,inputf: JSONStructure = None):
    smoothed_data = PT_savitzky_golay(parentName,childName,sample,derivative,polynomial,window,inputf)
    return smoothed_data

#**********************************************************************************************
#-------------------------------ML Functions-----------------------------------------
#**********************************************************************************************

@app.post('/plsAlgoritm',tags=['Ml Algorithms'])
def PLS_Algorithm(parentName:str,childName:str,sample: str,scatterCorrection: str,window: int,ploynomial: int,derivative: int, inputf: JSONStructure = None):
    #parameters = ['% Moisture Content','% Fat Content', '% Protein Content']
    parameters = ['% Moisture Content','% Fat Content']
    final_data = AN_pls_algo(parentName,childName,sample,scatterCorrection, \
    window,ploynomial,derivative,inputf,parameters)

    return final_data

#**********************************************************************************************
#-------------------------------File Upload Functions-----------------------------------------
#**********************************************************************************************

def read_file(file):

    file=file.file.read()
    try:
        df=pd.read_excel(pd.io.common.BytesIO(file),sheet_name='Sheet1',engine='openpyxl')
    except:
        df=pd.read_csv(pd.io.common.BytesIO(file))

    return df

@app.post("/uploadFilePred",tags=['Prediction Upload Controller'])
def upload_file(parent:str, child:str,model: str,file: UploadFile = File(...)):

    #parameters = ['% Moisture Content','% Fat Content', '% Protein Content']
    parameters = ['Moisture Content','Fat Content']
    df = read_file(file)
    df = FD_format_data(df)                                                          # Clean data

    final_pred=AN_upload_predict(child,parent,child,model,df,parameters)
    return {'prediction':final_pred}


@app.post("/uploadFile",tags=['File Upload Controller'])
def upload_file(file: UploadFile = File(...)):
    #parameters = ['% Moisture Content','% Fat Content', '% Protein Content']
    parameters = ['% Moisture Content','% Fat Content']
    df = read_file(file)

    try:

        df = FD_format_data(df)

        y_param_columns = df[parameters]
        final_param=y_param_columns.copy()                                      # Copy prediction parameter values
        final_param=final_param.to_json(orient='records')

        df1 = df.drop(parameters, axis = 1)                                     # drop prediction parameters
        df1 = FD_Transpose_data(df1)
        final_graph=df1.to_json(orient='records')

        df.reset_index(inplace = True)
        final_table=df.to_json(orient='records')

    except:
        print("Error Uploading File")                             # Convert to json

    return {'table':final_table,'graph':final_graph,'parameters':final_param}


#**********************************************************************************************
#-------------------------------Sensor Functions-----------------------------------------
#**********************************************************************************************

@app.get("/scanReferrenceData",tags=['Sensor Controller'])
def custom_config(name:str,start: float,end: float, repeat: float):

    detector = CCD()

    detector.cFrameCount.value = 10
    print(detector.cFrameCount.value)
    status = detector.Connect_CCD()
    if status == 0:
        detector.Capture_CCD()
    print("Connect Status: "+str(status))
    spectra = dectector.ccd_df.to_json(orient='records')
    return spectra



#**********************************************************************************************
#-------------------------------Models Functions-----------------------------------------
#**********************************************************************************************

@app.get("/allModels",tags=['Model Get Controller'])
def all_models(parentName:str, childName:str):
    type = 1 # for data 1: for graphs
    files = models(parentName,childName,type)
    return {'Mlmodels':files}

@app.get("/allMetricFiles",tags=['Model Get Controller'])
def all_models_metrics(parentName:str, childName:str):
    type = 0 # 0:for data 1: for graphs
    files = models(parentName,childName,type)
    return {'Mlmodels':files}

@app.get("/metrics",tags=['Model Get Controller'])
def all_models_metrics(parentName:str, childName:str,model:str):
    with open('Models/'+parentName+'/'+childName+'/graphs/'+model+'.json') as f:
        data=json.load(f)
    return {'metrics':data}

#**********************************************************************************************
#-------------------------------Authentication Functions-----------------------------------------
#**********************************************************************************************

@app.get("/userValidation",tags=['Authentication Controller'])
def user_validate(userName: str, password: str):
    if not os.path.isdir('Models'):
        os.makedirs('Models')
    authenticatedUSer=Auth(userName,password)
    authenticatedUSer=authenticatedUSer.login()
    return authenticatedUSer
#**********************************************************************************************
#-------------------------------Fetch json Functions-----------------------------------------
#**********************************************************************************************

@app.get("/parameters",tags=['Fetch Data'])
def get_parameters():
    return PM_parameters()

@app.get("/categories",tags=['Fetch Data'])
def get_categories():
    return PM_categories()
