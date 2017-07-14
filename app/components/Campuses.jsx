import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store, { gotCampusesFromServer } from '../store';
import NewCampus from './NewCampus';


export default class Campuses extends

  Component {
  constructor() {
    super();
    this.state = store.getState();

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


  render() {

    const campuses = this.state.campuses;

    return (
      <div>
        <div className="flex-grid">

          <div className="col campustext">
            <h1> Campuses </h1>
            <h4> With campuses conveniently located across the universe, we offer an extraordinary array of learning centers for the aspiring inter-planetary computer scientist.
            </h4>
          </div>
                      <NewCampus />

        </div >
        <div>
          {campuses.length > 0 ? (campuses.map(function (campus) {
            return (
              <div className="col-xs-3" key={campus.id}>
                <Link to={`/campus/${campus.id}`} >
                  <div className="caption">
                    <h5>
                      <span>{campus.name}</span>
                    </h5>
                  </div>
                  <img className="media-object" src={campus.image} alt="image" />
                </Link>

              </div>
            )
          })
          ) : null
          }
        </div>
      </div>
    )
  }
}
