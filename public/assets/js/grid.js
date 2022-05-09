var clients = [
    { "Date": "12/10/2019", "Select Floor": 2, "Select Material": 3, "QTY": "12", "UOM": "12", "Select Work": 4, "Unit Price": "12", "Total Price": "12" },
   { "Date": "13/12/2019", "Select Floor": 3, "Select Material": 4, "QTY": "12", "UOM": "12", "Select Work": 5, "Unit Price": "12", "Total Price": "12" }

];

var Floors = [
    { Name: "", Id: 0 },
    { Name: "Cellar Floor", Id: 1 },
    { Name: "Ground Floor", Id: 2 },
    { Name: "First Floor", Id: 3 },
     { Name: "Second Floor", Id: 4 },
      { Name: "Third Floor", Id: 5 },
       { Name: "Fourth Floor", Id: 6 },
        { Name: "Fivth Floor", Id: 7 }

];

var Material = [
    { Name: "", Id: 0 },
    { Name: "Please Select Material", Id: 1 },
    { Name: "Steel for:Columns", Id: 2 },
    { Name: "Steel for:Beams Roof", Id: 3 },
     { Name: "Steel for:Lintels", Id: 4 },
      { Name: "Concrete:Columns", Id: 5 },
       { Name: "Concrete:Beams Roof", Id: 6 },
        { Name: "Concrete:Lintels", Id: 7 },
          { Name: "Mason Labor for Concrete", Id: 8 },
            { Name: "Mason Labor for SuperStructure", Id: 9 },
              { Name: "Bricks:No.of Bricks", Id: 10 }

];

var Works = [
    { Name: "", Id: 0 },
    { Name: "Please Select Works", Id: 1 },
    { Name: "RMC/Brick", Id: 2 },
    { Name: "Steel/Tiles", Id: 3 },
     { Name: "Centering Area", Id: 4 },
      { Name: "Centering Labour", Id: 5 },
       { Name: "Ele/Mason Labour", Id: 6 },
        { Name: "10/20/40 mm Metal", Id: 7 },
          { Name: "Doors/Windows", Id: 8 },
            { Name: "Granite/Cement", Id: 9 },
              { Name: "Pipes for Electrical Plumbing", Id: 10 }




];



$("#jsGrid").jsGrid({
    width: "100%",
    height: "400px",

    inserting: true,
    editing: true,
    sorting: true,
    paging: true,

    data: clients,

    fields: [
        { name: "Date", type: "text", width: 150, validate: "required" },
        { name: "Select Floor", type: "select", items: Floors, valueField: "Id", textField: "Name", width: 100 },
          { name: "Select Material", type: "select", items: Material, valueField: "Id", textField: "Name", width: 100 },
        { name: "QTY", type: "number", width: 80 },
        { name: "UOM", type: "text", width: 100 },
        { name: "Select Work", type: "select", items: Works, valueField: "Id", textField: "Name", width: 100 },
      { name: "Unit Price", type: "text", width: 100 },
       { name: "Total Price", type: "text", width: 100 },
        { type: "control" }
    ]
});