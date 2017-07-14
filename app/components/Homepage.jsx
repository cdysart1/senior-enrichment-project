import React from 'react';
import {hashHistory} from 'react-router';


const Homepage = () => {

  return (
      <div>

          <header className="top">
            <div className="center" >
              <div className="jumbotron">
              <h1>MHI Academy</h1>
              <h5>an otherworldly learning experience</h5>
            </div>
            </div>
          </header>


            <div className="buttons" >
              <button onClick={() => hashHistory.push('/campus')} type="submit" >Locations</button>
              <button onClick={() => hashHistory.push('/student')}type="submit" >Students</button>
            </div>
        </div>

  )

}

export default Homepage;
