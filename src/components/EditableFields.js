import React, { Component } from 'react';
import Contact from './Contact';
import Section from './Section';
import uniqid from 'uniqid';

export default class EditableFields extends Component {
  constructor() {
    super()

    this.state = {
      userInfo: {
        name: "Ethan Zitting",
        contact: {
          phone: "(123)456-7890",
          email: '<3@gmail.com',
          website: 'ethanzitting.com',
          city: 'Colorado Springs, CO',
        }
      },
      sections: [],
    }

    this.addBullet = this.addBullet.bind(this);
    this.addSubsection = this.addSubsection.bind(this);
    this.addSection = this.addSection.bind(this);
    this.editSection = this.editSection.bind(this);
    this.editSubsection = this.editSubsection.bind(this);
    this.editBullet = this.editBullet.bind(this);
  }

  
  addBullet = (sectionObj, subsectionObj) => {
    const newState = Object.assign({}, this.state);
    console.log(newState);

    console.log(newState.sections[
      newState.sections.indexOf(sectionObj)
    ])
    
    // This is a nasty piece of code. So it finds the section you are in

    // Enter the sections array in the master state...
    newState.sections[
      // from the array of sections , find the section you are in using indexOf...
      newState.sections.indexOf(sectionObj)
    // Go to the subsections of that section... 
      ].subsections[
      // From the array of subsections, find the subsection you are in using indexOf...
      newState.sections[newState.sections.indexOf(sectionObj)].subsections.indexOf(subsectionObj)
    // Go to the bullets array and add in your new bullet.
    ].bullets.push('Description');

    this.setState(newState);
  }
  
  
  addSubsection = (sectionObj) => {
    // When activated, influence the state of EditableFields, add a skill, which will then be passed down to the Skills Section
    // Change the state to include a new, empty skills section with a generated id.
    const newState = Object.assign({}, this.state)
    
    newState.sections[newState.sections.indexOf(sectionObj)].subsections.push({
      title: 'New Subsection',
      key: uniqid(),
      bullets: [
        'New Bullet',
      ],
    })
    this.setState(newState);
    
  }
  

  addSection = () => {
    const newState = Object.assign({}, this.state);
    const newSection = {
      key: uniqid(),
      title: 'New Section',
      subsections: [
        {
          title: 'New Subsection',
          key: uniqid(),
          bullets:[
            'New Bullet',
          ]
        }
      ]
    }

    newState.sections.push(newSection);
    this.setState(newState);
  }

  editSection = (sectionObj, newTitle) => {
    const newState = Object.assign({}, this.state);
    newState.sections[newState.sections.indexOf(sectionObj)].title = newTitle;
    this.setState(newState);
  }

  editSubsection = (sectionObj, subsectionObj, newTitle) => {
    const newState = Object.assign({}, this.state);

    // Enter the sections array in the master state...
    newState.sections[
      // from the array of sections , find the section you are in using indexOf...
      newState.sections.indexOf(sectionObj)
    // Go to the subsections of that section... 
      ].subsections[
      // From the array of subsections, find the subsection you are in using indexOf...
      newState.sections[newState.sections.indexOf(sectionObj)].subsections.indexOf(subsectionObj)
    // Change the title of this subsection.
    ].title = newTitle;

    this.setState(newState);
  }

  editBullet = (sectionObj, subsectionObj, oldBullet, newBullet) => {
    console.log('editBullet fired.');
    console.log(sectionObj);
    console.log(subsectionObj);
    console.log(oldBullet);
    console.log(newBullet);
    
    const newState = Object.assign({}, this.state);

    // Enter the sections array in the master state...
    newState.sections[
      // from the array of sections , find the section you are in using indexOf...
      newState.sections.indexOf(sectionObj)
    // Go to the subsections of that section... 
      ].subsections[
      // From the array of subsections, find the subsection you are in using indexOf...
      newState.sections[newState.sections.indexOf(sectionObj)].subsections.indexOf(subsectionObj)
    // Go into the bullets array in that subsection...
    ].bullets[
      // All of this just applies the previous logic to find the index of the relevant bullet.
      newState.sections[
        newState.sections.indexOf(sectionObj)
        ].subsections[
        newState.sections[newState.sections.indexOf(sectionObj)].subsections.indexOf(subsectionObj)
      ].bullets.indexOf(oldBullet)
    // And set the new Bullet
    ] = newBullet;
    console.log(newState);
    this.setState(newState);
    console.log(this.state);
  }

  render() {
    const sectionsJSX = [];

    for (let i = 0; i < this.state.sections.length; i++) {
      sectionsJSX.push(<Section 
        key={this.state.sections[i].key} 
        sectionObj={this.state.sections[i]} 
        addSubsection={this.addSubsection} 
        addBullet={this.addBullet} 
        editSection={this.editSection}
        editSubsection={this.editSubsection}
        editBullet={this.editBullet}
        />)
    }

    return (
      <div className="container-fluid editable-fields">
        <h1 className="name text-center">{this.state.userInfo.name}</h1>
        <Contact contactInfo={this.state.userInfo.contact}/>
        {sectionsJSX}
        <button onClick={this.addSection}>Add Section</button>
      </div>
    )
  }
  
}