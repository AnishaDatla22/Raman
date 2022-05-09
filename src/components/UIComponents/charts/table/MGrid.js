import React, { Component } from 'react';
import DataTable from 'react-data-table-component';



class MGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state={
       rows:[{ id: 1, title: 'Conan the Barbarian', year: '1982' }],
       column:[{
          name: 'Title',
          selector: 'title',
          sortable: true,
        },
        {
          name: 'Year',
          selector: 'year',
          sortable: true,
          right: true,
        }
      ]
    }
    }
  render() {
    return (
      <DataTable
        title="Arnold Movies"
        columns={this.state.column}
        data={this.state.rows}
      />
    )
  }
}
export default MGrid;
