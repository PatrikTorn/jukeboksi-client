import React from 'react';
import {Provider} from 'react-redux'
import store from './store';
import ScreenContainer from "./containers/ScreenContainer";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ScreenContainer/>
            </Provider>
        );
    }

}
