import React, { Component } from 'react';
import Contact from './Contact';
import Section from './Section';

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
        skills: {
          title: "Skills",
          subsections: [
            {
              title: 'Business Development',
              bullets: [
                'you know ... stuff',
                'developed businessarily',
              ],
            },
            {
              title: 'Project Management',
              bullets: [
                'managing them projects boy',
                'mmhmm',
              ]
            }
          ],
        },
        workHistory: {
          title: "Work History",
          subsections: [
              {
              title: 'Delivery Driver',
              bullets: [
                'Drove them vans yo.',
                'beep beep',
              ],
            },
          ]
        },
        education: {
          title: "Education",
          subsections: [
            {
              title: 'Maryville University of St. Louis',
              bullets: [
                'Operations Managment',
                'Accounting',
              ]
            }
          ],
        },
        projects: {},
      }
    }
  }

  render() {
    const userInfo = this.state.userInfo;

    return (
      <div className="container-fluid editable-fields">
        <h1 className="name text-center">Ethan Zitting</h1>
        <Contact contactInfo={userInfo.contact}/>
        <Section section={userInfo.skills} />
        <Section section={userInfo.workHistory} />
        <Section section={userInfo.education} />
        <Section section={userInfo.projects} />
      </div>
    )
  }
  
}