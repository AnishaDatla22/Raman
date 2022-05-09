const config_data={

'api':'http://7c96c0536f64.ngrok.io',
'roles':{
'Operator':{'Dashboard':true,'grid':false},
'Admin':{'Dashboard':true,}
},
'menuItems':{
    "Tasks":{'path':'/{this.props.location.pathname}','icon':'glyphicon glyphicon-tasks fasize'},
    "Savitzky Golay":{'path':'/SavitzkyGolay','icon':null},
    "Multi Scatter Correction":{'path':'/','icon':null},
    "Prediction":{'path':'/prediction','icon':'fa fa-check-square-o fasize'},
    "Model Building":{'path':'/{this.props.location.pathname}','icon':'fa fa-clone fasize'},
    "PLS":{'path':'/plsAlgorithm','icon':null},
    "PCA":{'path':'/','icon':null},

},
"spectralData": [
      {
        "id": "SD1",
        "spectralParentCategory": "Poultry",
        "division": [
          {
            "id": "SD11",
            "spectralChildCategory": "Chick"
          },
          {
            "id": "SD12",
            "spectralChildCategory": "Broiler"
          },
          {
            "id": "SD13",
            "spectralChildCategory": "Breeder"
            },
          {
            "id": "SD14",
            "spectralChildCategory": "Layer"
          }
        ]
      },
      {
        "id": "SD2",
        "spectralParentCategory": "Agri",
        "division": [
          {
            "id": "SD21",
            "spectralChildCategory": "Grains"
          },
          {
            "id": "SD22",
            "spectralChildCategory": "Oils"
          },
          {
            "id": "SD23",
            "spectralChildCategory": "Fruits"
          },
          {
            "id": "SD24",
            "spectralChildCategory": "Vegetables"
          }
        ]
      },
      {
        "id": "SD3",
        "spectralParentCategory": "Dairy",
        "division": [
          {
            "id": "SD31",
            "spectralChildCategory": "Milk"
          },
          {
            "id": "SD32",
            "spectralChildCategory": "Cheese/Butter"
          },
          {
            "id": "SD33",
            "spectralChildCategory": "Whey"
          },
          {
            "id": "SD34",
            "spectralChildCategory": "Cassein"
          }
        ]
      }
    ]

};



export const Config = [

JSON.stringify(config_data)





]
