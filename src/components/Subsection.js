import React, { Component } from 'react';
import Bullet from './Bullet';
import uniqid from 'uniqid';

export default class Subsection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const bullets = this.props.subsection.bullets;
    const bulletsJSX = [];

    if (bullets) {
      for (let i = 0; i < bullets.length; i++) {
        bulletsJSX.push(<Bullet key={uniqid()} description={bullets[i]} onClick={() => this.props.submitChange()} />);
      }
    }

    return (
      <div>
        <strong>{this.props.subsection.title}</strong>
        {bulletsJSX}
      </div>
    )
  }
}