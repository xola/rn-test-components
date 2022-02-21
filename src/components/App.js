import React from 'react';
import { createAppContainer } from 'react-navigation';
import { bootstrap } from '../actions/bootstrapActions';
import { connect } from 'react-redux';
import NavigationService from './NavigationService';
import Navigator from './Navigator';

const AppContainer = createAppContainer(Navigator);

class App extends React.Component {
    componentDidMount() {
        this.props.bootstrap();
    }

    render() {
        return (
            <AppContainer
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}
            />
        );
    }
}

const mapDispatchToProps = {
    bootstrap,
};

export default connect(
    null,
    mapDispatchToProps,
)(App);
