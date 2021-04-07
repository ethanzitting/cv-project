import React, { Component } from 'react';
import Subsection from './Subsection';
import uniqid from 'uniqid';

export default class Section extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempTitle: "",
    }

    this.makeEditable = this.makeEditable.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }

  makeEditable = () => {
    console.log('makeEditable fired.');
    this.setState({
      editable: true,
    })
  }

  submitEdit = (e) => {
    e.preventDefault();
    console.log('submitEdit fired');

    this.props.editSection(this.props.sectionObj, e.target.elements[0].value);

    this.setState({
      editable: false,
    })
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

    if (this.state.editable) {
      return (
        <div className="row">
          <h3>
            <form onSubmit={this.submitEdit}>
                <input
                  placeholder={section.title}
                  type="text"
                />
                <button className="inline-button" type="submit"><img src="./images/save.svg" alt="save icon"/></button>
            </form>
          </h3>
          <div className="container-fluid">
            {subsections}
          </div>
          <button onClick={() => this.props.addSubsection(this.props.sectionObj)}>Add Subsection</button>
          <hr />
        </div>
      )
    } else {
      return (
        <div className="row">
          <h3>
            {section.title}
            <button onClick={this.makeEditable}>
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
}