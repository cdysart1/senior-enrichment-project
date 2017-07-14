import store, { postCampus, writeCampus } from '../store';
import React, { Component } from 'react';

export default class NewCampus extends Component {

  constructor() {
    super();
    this.state = store.getState();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange(evt) {
    const action = writeCampus(evt.target.value);
    store.dispatch(action);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const name = this.state.newCampusEntry;

    store.dispatch(postCampus({ name  }));
    store.dispatch(writeCampus(''));

  }

  render() {
    return (
      <div className="form-group" >
        <form id="new-message-form"  onSubmit={this.handleSubmit}>
          <div>
            <legend>Add a Campus</legend>
            <input
              className="form-control"
              type="text"
              name="name"
              value={this.state.gotNewCampus}
              onChange={this.handleChange}
              placeholder="you pick the name"
            />
          </div>
        </form>
      </div>
    )
  }
}
