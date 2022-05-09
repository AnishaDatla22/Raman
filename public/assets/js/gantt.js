anychart.onDocumentReady(function () {    	
    // create data
    var data = [
      {
        id: "1",
        name: "First Floor",
        actualStart: "2018-03-01",
        actualEnd: "2018-03-12",
        children: [
          {
            id: "1_1",
            name: "Brick Work",
            actualStart: "2018-03-01",
            actualEnd: "2018-03-05",
			      progressValue:0.6
          },
          {
            id: "1_2",
            name: "Cement work",
            actualStart: "2018-03-05",
            actualEnd: "2018-03-10",
			progressValue:0
          },
          {
            id: "1_3",
            name: "Slab",
            actualStart: "2018-03-10",
            actualEnd: "2018-03-12"
          },
        
      ]}
    ];
    // create a data tree
    var treeData = anychart.data.tree(data, "as-tree");  
    // create a chart
    var chart = anychart.ganttProject();    
    // set the data
    chart.data(treeData);
    // set the container id
    chart.container("container");  
    // initiate drawing the chart
    chart.draw();
    // fit elements to the width of the timeline
    chart.fitAll();
  });  