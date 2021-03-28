import React, { Component } from 'react';

export default class Bullet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      tempValue: '',
    }

    this.makeChangeable = this.makeChangeable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveChange = this.saveChange.bind(this);
  }

  makeChangeable = () => {
    this.setState({
      editable: true,
    })
  }

  handleChange = (e) => {
    this.setState({
      tempValue: e.target.value,
    });
    console.log(this.state.tempValue);
  }

  saveChange = (e) => {
    // Set the new props
    this.props.submitChange(e.target.value);

    this.setState({
      editable: false,
      tempValue: '',
    })
  }

  render() {
    if (this.editable) {
      return (
        <div className="row">
          <form onSubmit={this.saveChange}>
            <input
              onChange={this.handleChange}
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
