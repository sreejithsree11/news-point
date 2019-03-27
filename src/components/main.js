import React from 'react';
import {Switch, Route} from 'react-router-dom';

import TestInfinte from './testInfinte';
import Feed from './feed/Feed';


const Main  = () => (
     <Switch>
        <Route exact path="/" component={Feed}/>
        <Route exact path="/test" component={TestInfinte}/>
        {/* <Route exact path="/contact" component={Contact}/>
        <Route exact path="/projects" component={Projects}/>
        <Route exact path="/resume" component={Resume}/>
        <Route exact path="/tick" component={Tick}/>
        <Route exact path="/Login" component={Login}/> */}
    </Switch>
)

export default Main;