import React, { Component } from 'react';
import store, { gotStudentFromServer } from '../store';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeleteStudent from './DeleteStudent';



export default class SingleStudent extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/api/student/${id}`)
      .then(res => res.data)
      .then(student => {
        const action = gotStudentFromServer(student);
        store.dispatch(action);
      });

    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {

    const student = this.state.student;
    console.log(student, 'campusId');
    const campuses = this.state.campuses;

    // console.log(this.state.student.campusId.name, 'student');

    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Student Information
          </h3>
        </div>
        <div className="panel-body">
          Student Id:     {student.id}
        </div>
        <div className="panel-body">
          Name:     {student.name}
        </div>
        <div className="panel-body">
          Student Email:     {student.email}
        </div>
        <div className="panel-body">
          Campus:
          {campuses.length > 0 ? (campuses.map(function (campus) {
            if (campus.id === student.campusId) {
              return (
                <Link to={`/campus/${campus.id}`} >
                  {campus.name}
                </Link>
              )
            }
          })
          ) : null
          }
          <br />
          <DeleteStudent />

        </div>
      </div>
    )
  }
}

