import store, { writeStudent, postStudent, writeEmail, selectStudentCampus, gotCampusesFromServer } from '../store';
import React, { Component } from 'react';
import axios from 'axios';

export default class NewStudent extends Component {

  constructor() {
    super();
    this.state = store.getState();

    this.handleChange = this.handleChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/campus')
      .then(res => res.data)
      .then(campuses => {
        const action = gotCampusesFromServer(campuses);
        store.dispatch(action);
      });

    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange(evt) {
    const action = writeStudent(evt.target.value);
    store.dispatch(action);
  }

  handleEmailChange(evt) {
    const action = writeEmail(evt.target.value);
    store.dispatch(action);
  }

  handleCampusChange(evt) {

    this.setState({selectedCampus: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const name = this.state.newStudentEntry;
    const email = this.state.newEmailEntry;
    const campusId = this.state.selectedCampus;

    console.log({name, email, campusId }, 'post');

    store.dispatch(postStudent({ name, email, campusId }));

    store.dispatch(writeStudent(''));
    store.dispatch(writeEmail(''));
  }

  render() {
    const campuses = this.state.campuses;
    const handle = this.handleCampusChange;
    console.log(campuses, 'campuses');
    return (
      <div className="form-group" >
        <form id="new-message-form" onSubmit={this.handleSubmit}>
          <div>
            <legend>Add a Student</legend>
            <input
              className="form-control"
              type="text"
              name="name"
              value={this.state.gotNewStudent}
              onChange={this.handleChange}
              placeholder="student name"
            /> <br />
            <input
              className="form-control"
              type="text"
              name="email"
              value={this.state.gotNewStudent}
              onChange={this.handleEmailChange}
              placeholder="student email"
            /> <br />
          </div>
          <div>
            <select
              form="new-message-form"
              onChange={handle}
              >
              {campuses.map(function (campus) {
                return (
                    <option
                      key={campus.id}
                      name="campus"
                      value={campus.id}
                      >
                      {campus.name}
                    </option>
                )
              })}
            </select>
          </div>
          <br />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Add Me!</button>
          </span>
        </form>
      </div>
    )
  }
}
