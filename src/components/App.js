import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { bootstrap } from '../actions/bootstrapActions';
import { connect } from 'react-redux';
import { navigationRef } from './NavigationService';
import Navigator from './Navigator';

class App extends React.Component {
    componentDidMount() {
        this.props.bootstrap();
    }

    render() {
        return (
            <NavigationContainer ref={navigationRef}>
                <Navigator />
            </NavigationContainer>
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
