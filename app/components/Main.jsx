import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Campuses from './Campuses';
import Students from './Students';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import Homepage from './Homepage';


export default class Main extends Component {

  constructor() {
    super();
    this.state = {

    };
}

  render() {
    return (
    // <div>
      <div>
       <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/campus" component={Campuses} />
            <Route exact path="/campus/:id" component={SingleCampus} />
            <Route exact path="/student" component={Students} />
            <Route exact path="/student/:id" component={SingleStudent} />
          </Switch>
        </Router>
      </div>

    )
  }
}



