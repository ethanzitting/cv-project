import React, { Component } from 'react';

export default class Bullet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
    }

    this.makeChangeable = this.makeChangeable.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }

  makeChangeable = () => {
    console.log('makeChangeable fired.')
    this.setState({
      editable: true,
    })
  }

  submitEdit = (e) => {
    e.preventDefault();
    // Set the new props
    this.props.editBullet(
      this.props.sectionObj, 
      this.props.subsectionObj, 
      this.props.subsectionObj.bullets[this.props.subsectionObj.bullets.indexOf(this.props.description)], 
      e.target.elements[0].value
    );

    this.setState({
      editable: false,
    })
  }

  render() {
    if (this.state.editable) {
      return (
        <div className="row">
          <form onSubmit={this.submitEdit}>
            <input
              placeholder={this.props.description}
              type="text"
            />
            <button type="submit"><img src="./images/save.svg" alt="save icon"/></button>
          </form>
        </div>
      )
    } else {
        return (
        <div className="row">
          {this.props.description}
          <button onClick={this.makeChangeable}>
            <img src="./images/write.svg" alt="edit icon"/>
          </button>
        </div>
      )
    }
  }
}
