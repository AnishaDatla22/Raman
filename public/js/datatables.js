$(function () {
    $('#example1').DataTable()
    $('#example3').DataTable()
    $('#dpr').DataTable(
      {
        "columnDefs": [
          { "width": "20%", "targets": 0 }
        ],
        "scrollX": true,
        "bLengthChange": false,
        "aaSorting": [],
        "pageLength" : 5,
         "lengthMenu": [[5, 10, 20, -1], [5, 10, 20,'All']]
      
    }

    )
    $('#materialsConsumed').DataTable()
    $('#materialsReceived').DataTable()

    $('#materialsIssued').DataTable()
    $('#dashWork').DataTable()
    $('#dashMaterial').DataTable()
    $('#users').DataTable()




    

    $('#example2').DataTable({
      'paging'      : true,
      'lengthChange': false,
      'searching'   : false,
      'ordering'    : true,
      'info'        : true,
      'autoWidth'   : false
    })
  })