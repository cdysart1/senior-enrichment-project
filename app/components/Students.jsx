import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import store, { gotStudentsFromServer } from '../store';
import NewStudent from './NewStudent';


export default class Students extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    axios.get('/api/student')
      .then(res => res.data)
      .then(students => {
        const action = gotStudentsFromServer(students);
        store.dispatch(action);
      });

    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const students = this.state.students;

    return (
      <div>
        <div id= "container">
        <div className="studentName row">
          <div className="col-sm-8 col students">
            <h1>Our Students</h1>
            <div>
              {students.length > 0 ? (students.map(function (student) {
                return (
                  <div key={student.id} className="col-xs-4">
                    <ul className = "studentList"  >
                      <Link to={`/student/${student.id}`}>
                        <li> {student.name} </li>
                      </Link>
                    </ul>
                  </div>
                )
              })
              ) : null
              }
            </div>
          </div>
          <div className="studentCol">
          <br />
            <NewStudent />
          </div>

        </div>
        </div>
      </div>
    )
  }
}
