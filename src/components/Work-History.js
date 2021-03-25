import React, { Component } from 'react';

export default class WorkHistory extends Component {
  render() {
    return (
      <div className="row">
        <h3>WorkHistory</h3>
        <div className="container-fluid">
          <div className="row">
            <strong>Job 1</strong>
            <p>Details</p>
          </div>
          <div className="row">
            <strong>Job 2</strong>
            <p>Details</p>
          </div>
        </div>
      </div>
    )
  }
}