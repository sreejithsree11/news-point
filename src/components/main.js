import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Job from './job/Job';
import Feed from './feed/Feed';

const Main  = () => (
     <Switch>
        <Route exact path="/" component={Feed}/>
        <Route exact path="/job" component={Job}/>
    </Switch>
)

export default Main;