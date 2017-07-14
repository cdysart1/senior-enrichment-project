import store, { deleteStudent, removeStudent } from '../store';
import React, { Component } from 'react';
import {hashHistory} from 'react-router';

export default class DeleteStudent extends Component {

  constructor() {
    super();
    this.state = store.getState();

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));

  }

  componentWillUnmount() {
    this.unsubscribe();
  }


  handleSubmit(evt) {
    evt.preventDefault();

    const id = this.state.student.id;
    store.dispatch(deleteStudent(Number(id)));
    store.dispatch(removeStudent(Number(id)));

  }

  render() {
    return (
      <div className="form-group" >
        <form id="new-message-form" onSubmit={this.handleSubmit} onClick={() => hashHistory.push('/student')} >
          <div>
            <legend>Delete a Student</legend>

          </div>
          <span className="input-group-btn">
            <button
              className="btn btn-default" type="submit"
              >Delete Me!</button>
          </span>

        </form>
      </div>
    )
  }
}
