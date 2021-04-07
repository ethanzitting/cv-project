import React, { Component } from 'react';
import Subsection from './Subsection';
import uniqid from 'uniqid';

export default class Section extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempTitle: "",
    }
  }

  render() {
    const section = this.props.sectionObj;
    
    const subsections = [];

    if (section.subsections) {
      for (let i = 0; i < section.subsections.length; i++) {
        subsections.push(<Subsection 
          key={uniqid()} 
          sectionObj={this.props.sectionObj} 
          subsectionObj={this.props.sectionObj.subsections[i]} 
          addBullet={this.props.addBullet}
          editSubsection={this.props.editSubsection} 
          editBullet={this.props.editBullet}/>)
      }
    }    

    return (
      <div className="row">
        <h3>
          {section.title}
          <button onClick={this.makeChangeable}>
            <img src="./images/write.svg" alt="edit icon"/>
          </button>
        </h3>
        <div className="container-fluid">
          {subsections}
        </div>
        <button onClick={() => this.props.addSubsection(this.props.sectionObj)}>Add Subsection</button>
        <hr />
      </div>
    )
  }
}