import { createStore, applyMiddleware } from 'redux';
//import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-
import axios from 'axios';

// ACTION TYPES
const GOT_CAMPUSES_FROM_SERVER = 'GOT_CAMPUSES_FROM_SERVER';
const GOT_CAMPUS_FROM_SERVER = 'GOT_CAMPUS_FROM_SERVER';
const GOT_STUDENTS_FROM_SERVER = 'GOT_STUDENTS_FROM_SERVER';
const GOT_STUDENT_FROM_SERVER = 'GOT_STUDENT_FROM_SERVER';

const GOT_NEW_STUDENT = 'GOT_NEW_STUDENT'
const GOT_NEW_EMAIL = 'GOT_NEW_EMAIL'

const WRITE_STUDENT = 'WRITE_STUDENT';
const WRITE_EMAIL = 'WRITE_EMAIL';
// const SELECT_STUDENT_CAMPUS = 'SELECT_STUDENT_CAMPUS';

const DELETE_STUDENT = 'DELETE_STUDENT';

const GOT_NEW_CAMPUS = 'GOT_NEW_CAMPUS'
const WRITE_CAMPUS = 'WRITE_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

// INITIAL STATE
const initialState = {
  campuses: [],
  students: [],
  newStudentEntry: '',
  newCampusEntry: '',
  campus: [],
  student: [],
  newEmailEntry: '',
};
// ACTION CREATORS
export function gotCampusesFromServer(campuses) {
  const action = {
    type: GOT_CAMPUSES_FROM_SERVER,
    campuses
  };
  return action;
}

export function gotCampusFromServer(campus) {
  const action = {
    type: GOT_CAMPUS_FROM_SERVER,
    campus
  };
  return action;
}

export function gotNewCampus(newCampus) {
  const action = {
    type: GOT_NEW_CAMPUS,
    newCampus
  }
  return action;
}
export function writeCampus(inputContent) {
  const action = {
    type: WRITE_CAMPUS,
    newCampusEntry: inputContent
  }
  return action;
}


export function deleteCampus(id) {
  const action = {
    type: DELETE_CAMPUS,
    data: id
  }
  return action;
}

export function gotStudentsFromServer(students) {
  const action = {
    type: GOT_STUDENTS_FROM_SERVER,
    students
  }
  return action;
}

export function gotStudentFromServer(student) {
  const action = {
    type: GOT_STUDENT_FROM_SERVER,
    student
  }
  return action;
}

export function gotNewStudent(newStudent) {
  const action = {
    type: GOT_NEW_STUDENT,
    newStudent
  }
  return action;
}

export function gotNewEmail(newEmail) {
  const action = {
    type: GOT_NEW_EMAIL,
    newEmail
  }
  return action;
}

export function writeStudent(inputContent) {
  const action = {
    type: WRITE_STUDENT,
    newStudentEntry: inputContent
  }
  return action;
}

export function writeEmail(inputContent) {
  const action = {
    type: WRITE_EMAIL,
    newEmailEntry: inputContent
  }
  return action;
}


export function deleteStudent(id) {
  const action = {
    type: DELETE_STUDENT,
    data: id
  }

  return action;
}

export function postStudent(student) {

  return function thunk(dispatch) {
    return axios.post('/api/student', student)
      .then(res => res.data)
      .then(newStudent => {
        const action = gotNewStudent(newStudent);
        dispatch(action);
        // socket.emit('new-student', newStudent);
      });
  }
}

export function postCampus(campus) {

  return function thunk(dispatch) {
    return axios.post('/api/campus', campus)
      .then(res => res.data)
      .then(newCampus => {
        const action = gotNewCampus(newCampus);
        dispatch(action);
        // socket.emit('new-student', newStudent);
      });
  }
}

export function removeStudent(id) {
  return function thunk(dispatch) {

    return axios.delete(`/api/student/${id}`)
      .then(res => res.data)
      .then(student => {
        const action = deleteStudent(student);
        dispatch(action);
      });
  }
}

export function removeCampus(id) {

  return function thunk(dispatch) {

    return axios.delete(`/api/campus/${id}`)
      .then(res => res.data)
      .then(campus => {
        const action = deleteCampus(campus);
        dispatch(action);
      });
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case GOT_CAMPUSES_FROM_SERVER:
      return Object.assign({}, state, { campuses: action.campuses });
    case GOT_CAMPUS_FROM_SERVER:
      return Object.assign({}, state, { campus: action.campus });
    case GOT_STUDENTS_FROM_SERVER:
      return Object.assign({}, state, { students: action.students });
    case GOT_STUDENT_FROM_SERVER:
      return Object.assign({}, state, { student: action.student });
    case GOT_NEW_STUDENT:
      return Object.assign({}, state, { students: state.students.concat(action.newStudent) });
    case GOT_NEW_EMAIL:
      return Object.assign({}, state, { students: state.students.concat(action.newEmail) });
    case WRITE_STUDENT:
      return Object.assign({}, state, { newStudentEntry: action.newStudentEntry });
    case WRITE_EMAIL:
      return Object.assign({}, state, { newEmailEntry: action.newEmailEntry });
    case GOT_NEW_CAMPUS:
      return Object.assign({}, state, { campuses: state.campuses.concat(action.newCampus) });
    case WRITE_CAMPUS:
      return Object.assign({}, state, { newCampusEntry: action.newCampusEntry });
    case DELETE_CAMPUS:
      return Object.assign({}, state, {
        campuses: state.campuses.filter(campus => campus.id !== action.data)
      });
    case DELETE_STUDENT:
      return Object.assign({}, state, { students: state.students.filter(student => student.id !== action.data) });
    default:
      return state;
  }
}


export default createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))

