import store, { deleteCampus, removeCampus } from '../store';
import React, { Component } from 'react';
import {hashHistory} from 'react-router';


export default class DeleteCampus extends Component {

  constructor() {
    super();
    this.state = store.getState();

    // this.handleChange = this.handleChange.bind(this);
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

    const id = this.state.campus.id;
    store.dispatch(deleteCampus( Number(id) ));
    store.dispatch(removeCampus( Number(id)));
  }

  render() {
    return (
      <div className="form-group" >
        <form id="new-message-form" onSubmit={this.handleSubmit} onClick={() => hashHistory.push('/campus')}>
          <div>
            <legend>Delete a Campus</legend>
          </div>
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Delete Me!</button>
          </span>

        </form>
      </div>
    )
  }
}
