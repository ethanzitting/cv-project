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
      sections: [
        {
          key: uniqid(),
          title: 'Skills',
          subsections: [
            {
              title: 'Skill Title',
              key: uniqid(),
              bullets:[
                'Skill Details',
                'Skill Details',
              ]
            }
          ]
        },
        {
          key: uniqid(),
          title: 'Work History',
          subsections: [
            {
              title: 'Job Title',
              key: uniqid(),
              bullets:[
                'Job Details',
                'Job Details',
              ]
            }
          ]
        }
      ],
    }
    
    this.useCookies = this.useCookies.bind(this);
    this.updateCookies = this.updateCookies.bind(this);
    this.addBullet = this.addBullet.bind(this);
    this.addSubsection = this.addSubsection.bind(this);
    this.addSection = this.addSection.bind(this);
    this.editSection = this.editSection.bind(this);
    this.editSubsection = this.editSubsection.bind(this);
    this.editBullet = this.editBullet.bind(this);
  }

  useCookies = () => {
    const extractValue = (keyValueString) => keyValueString.split('-')[1];

    const isSubsectionTitle = (inputString) => {
      if (inputString.includes(`subsection`) && inputString.includes(`title`)) {
        return extractValue(inputString);
      } else {
        return false;
      }
    }

    const isBullet = (inputString) => inputString.includes('bullet') ? true : false;

    const cookie = document.cookie;
    // First, split the cookie by ';' to get section strings

    let processedCookies = {};
    processedCookies.sections = cookie.split(';');

    // Then, split the cookie by ',' to get an array of key value pairs
    for (let i = 0; i < processedCookies.sections.length; i++) {
      processedCookies.sections[i] = processedCookies.sections[i].split(',');

      // Extract the Section title
      processedCookies.sections[i].title = extractValue(processedCookies.sections[i][0]);
      // Remove the section title key-value pair
      processedCookies.sections[i].splice(0, 1);

      // Extract the Section Key
      processedCookies.sections[i].key = extractValue(processedCookies.sections[i][0]);
      // Remove the section key key-value pair
      processedCookies.sections[i].splice(0,1);

      // Establish the subsections array to store the extracted subsections
      processedCookies.sections[i].subsections = [];

      // Loop through the array of key-value pairs to find the subsections
      for (let j = 0; j < processedCookies.sections[i].length; j++) {

        // If we are at a subsection title...
        if (isSubsectionTitle(processedCookies.sections[i][j])) {
          console.log(`subsection title found: ${processedCookies.sections[i][j]}`);

          // Extract the subsection Title
          processedCookies.sections[i].subsections[j] = {};
          processedCookies.sections[i].subsections[j].title = extractValue(processedCookies.sections[i][j]);

          // Extract the subsection Key
          processedCookies.sections[i].subsections[j].key = extractValue(processedCookies.sections[i][j + 1]);
          
          // Establish an array to store the bullets
          processedCookies.sections[i].subsections[j].bullets = [];

          // Make a new loop that starts off where the old loop was and loops through all the bullets
          for (let k = j; k < processedCookies.sections[i].length; k++) {
            console.log(processedCookies.sections[i][k]);
            // If the current key-value pair is a bullet...
            if (isBullet(processedCookies.sections[i][k])) {
              console.log(`bullet found ${processedCookies.sections[i][k]}`)
              // extract the bullet text and store it in the array.
              let bulletText = processedCookies.sections[i][k].split('-');
              bulletText = bulletText[1];
              console.log(processedCookies);
              console.log(`i:${i} j:${j} k:${k}`);
              processedCookies.sections[i].subsections[j].bullets[processedCookies.sections[i].subsections[j].bullets.length] = bulletText;
            } else {
              break;
            }
          }
        }
      }
    }

    console.log(processedCookies);
    
    // Then, construct from that array a section object

    // Then, set state to match the section objects.
  }

  // Resets cookies to match current state
  updateCookies = () => {
    // Clear away all existing cookies
    document.cookie = '';

    // simplifies the following code
    const sections = this.state.sections;
    // iterates through the sections in state creating a cookie for each one.
    for (let i = 0; i < sections.length; i++) {
      let cookieString = '';
      cookieString += `section${i}=`;
      cookieString += `title-${sections[i].title},`;
      cookieString += `key-${sections[i].key},`;

      // simplifies the following code
      const subsections = sections[i].subsections;
      // iterates through all the subsections in each section, adding their info to the value string
      for (let j = 0; j < subsections.length; j++) {
        cookieString += `subsection${j}title-${subsections[j].title},`;
        cookieString += `subsection${j}key-${subsections[j].key},`;
        
        // simplifies the following code
        const bullets = subsections[j].bullets;
        // iterates through all the bullets in each subsection, adding them to the string
        for (let k = 0; k < bullets.length; k++) {
          cookieString += `bullet${k}-${bullets[k]},`;
        }
      }

      // Sets the cnew cookie to expire in a year
      cookieString += `;max-age=31000000`;

      // Adds the cookie string to the document cookies.
      document.cookie = cookieString;
    }

    console.log('cookies updated');
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

    this.updateCookies();
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
    
    this.updateCookies();
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
    this.updateCookies();
  }

  editSection = (sectionObj, newTitle) => {
    const newState = Object.assign({}, this.state);
    newState.sections[newState.sections.indexOf(sectionObj)].title = newTitle;
    this.setState(newState);
    this.updateCookies();
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
    this.updateCookies();
  }

  editBullet = (sectionObj, subsectionObj, oldBullet, newBullet) => {    
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
    
    this.setState(newState);

    this.updateCookies();
  }

  render() {
    const sectionsJSX = [];
    this.useCookies();

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