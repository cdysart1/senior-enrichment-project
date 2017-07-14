import React, { Component } from 'react';
import store, { gotCampusFromServer } from '../store';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeleteCampus from './DeleteCampus';

export default class SingleCampus extends

  Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/api/campus/${id}`)
      .then(res => res.data)
      .then(campus => {
        const action = gotCampusFromServer(campus);
        store.dispatch(action);
      });

    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const campusId = Number(this.props.match.params.id);

    const campus = this.state.campus;
    const students = this.state.students;

    return (
      <div>
        <div className="jumbotron singleCampus">
          <h1>
          {campus.name}
          </h1>
        </div>
          <div>
            {students.map(function (student){
              if (student.campusId === campus.id) {
                return (
                  <ul>
                    <li className ="campusstudentlist">
                      <Link to={`/student/${student.id}`} >
                        {student.name}
                      </Link>
                     </li>
                  </ul>
                )
              }
            })}
          </div>
          <DeleteCampus />
      </div>
    )
  }
  }

