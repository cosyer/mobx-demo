import React, {Component} from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react'
import Menu from './Menu';
import NotFound from '../components/NotFound';
import routers from '../router/router';
import history from '../router/history';
import DevTools from 'mobx-react-devtools'

class App extends Component {
    render() {
        return (
            <Provider {...this.props}>
                <Router history={history}>
                    <div>
                        <Menu />
                        <Switch>
                            {routers.map((route, i) => {
                                return <Route key={i} exact path={route.path} component={route.component}/>
                            })}
                            <Route component={NotFound}/>
                        </Switch>
                        <DevTools />
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App