import React, { Component } from 'react';
import Contact from './Contact';
import Skills from './Skills';
import WorkHistory from './Work-History';
import Education from './Education';
import Projects from './Projects';

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
        },
        skills: {},
        workHistory: {},
        education: {},
        projects: {},
      }
    }
  }
  render() {
    return (
      <div className="container-fluid editable-fields">
        <h1 className="name text-center">Ethan Zitting</h1>
        <Contact contactInfo={this.state.userInfo.contact}/>
        <Skills />
        <WorkHistory />
        <Education />
        <Projects />
      </div>
    )
  }
  
}