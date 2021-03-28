import React, { Component } from 'react';
import Subsection from './Subsection';
import uniqid from 'uniqid';

export default class Section extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempSkill: "",
      skills: [
      ],
    }
  }

  render() {
    const section = this.props.section;

    const subsections = [];

    if (section.subsections) {
      for (let i = 0; i < section.subsections.length; i++) {
        subsections.push(<Subsection key={uniqid()} subsection={section.subsections[i]} />)
      }
    }

    return (
      <div className="row">
        <h3>{section.title}</h3>
        <div className="container-fluid">
          {subsections}
        </div>
      </div>
    )
  }
}