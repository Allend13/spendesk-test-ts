import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import TeamList from './components/TeamsList'
import ApproveFlow from './components/ApproveFlow'

const Routes: React.SFC = () => (
  <Switch>
    <Route exact path="/" component={TeamList} />
    <Route path="/approve-flow/:teamId" component={ApproveFlow} />
    <Route component={() => <div>Not Found</div>} />
  </Switch>
)

export default Routes
