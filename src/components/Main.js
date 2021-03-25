import React, { Component } from 'react';
import PageTitle from './PageTitle';
import EditableFields from'./EditableFields.js';

export default class Main extends Component {
  render() {
    return (
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-1 col-md-2"></div>
            <div className="col-10 col-md-8">
              <PageTitle />
              <EditableFields />
            </div>
            <div className="col-1 col-md-2"></div>
          </div>
        </div>
      </main>
    )
  }
}