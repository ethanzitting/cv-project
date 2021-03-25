import React, { Component } from 'react';

export default class Skills extends Component {
  constructor(props) {
    super(props);

    this.State = {
      tempSkill: "",
      skills: [],
    }
  }
  render() {
    return (
      <div className="row">
        <h3>Skills</h3>
        <div className="container-fluid">
          <div className="row">
            <strong>Skill 1</strong>
            <div className="container-fluid">
              <div className="row">
                <p>details</p>
              </div>
            </div>
          </div>
          <div className="row">
            <strong>Skill 2</strong>
            <div className="container-fluid">
              <div className="row">
                <p>details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}