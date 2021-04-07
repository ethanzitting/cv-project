import React, { Component } from 'react';
import Bullet from './Bullet';
import uniqid from 'uniqid';

export default class Subsection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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

    return (
      <div>
        <strong>{this.props.subsectionObj.title}</strong>
        {bulletsJSX}
        <button onClick={() => this.props.addBullet(this.props.sectionObj, this.props.subsectionObj)}>Add Bullet</button>
      </div>
    )
  }
}