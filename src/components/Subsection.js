import React, { Component } from 'react';
import Bullet from './Bullet';
import uniqid from 'uniqid';

export default class Subsection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
    };

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

    this.props.editSubsection(this.props.sectionObj, this.props.subsectionObj, e.target.elements[0].value);

    this.setState({
      editable: false,
    })
  }

  render() {
    const bullets = this.props.subsectionObj.bullets;
    const bulletsJSX = [];

    if (bullets) {
      for (let i = 0; i < bullets.length; i++) {
        bulletsJSX.push(<Bullet 
          key={uniqid()} description={bullets[i]} 
          sectionObj={this.props.sectionObj} 
          subsectionObj={this.props.subsectionObj} 
          onClick={() => this.props.submitChange()} 
          editBullet={this.props.editBullet} />);
      }
    }

    if (this.state.editable) {
      return (
        <div>
          <form onSubmit={this.submitEdit}>
              <input
                placeholder={this.props.subsectionObj.title}
                type="text"
              />
              <button className="inline-button" type="submit"><img src="./images/save.svg" alt="save icon"/></button>
          </form>
          {bulletsJSX}
          <button onClick={() => this.props.addBullet(this.props.sectionObj, this.props.subsectionObj)}>Add Bullet</button>
        </div>
      )
    } else {
      return (
        <div>
          <strong>
            {this.props.subsectionObj.title}
            <button className="inline-button" onClick={this.makeEditable}>
              <img src="./images/write.svg" alt="edit icon"/>
            </button>
          </strong>
          {bulletsJSX}
          <button onClick={() => this.props.addBullet(this.props.sectionObj, this.props.subsectionObj)}>Add Bullet</button>
        </div>
      )
    }
  }
}