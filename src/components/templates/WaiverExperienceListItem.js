import React, { Component } from 'react';
import LoadingButton from '../common/LoadingButton';
import ListItem from './ListItem';
import { connect } from 'react-redux';

class WaiverExperienceListItem extends Component {
    handleSignWaiver = () => {
        this.props.onClick(this.props.order, this.props.item);
    };

    renderActionButton() {
        const { experiences, item } = this.props;
        if (!item.experience) {
            return null;
        }
        const experience = experiences[item.experience.id];
        if (!experience) {
            return null;
        }

        return experience.waiverPreference ? (
            <LoadingButton onPress={this.handleSignWaiver} title="Sign waiver now" styleNames={['medium', 'success']} />
        ) : (
            <LoadingButton title="No waiver needed" styleNames={['medium', 'empty']} />
        );
    }

    render() {
        const { experiences, item, onClick, selectedWaiver } = this.props;
        if (!item.experience) {
            return null;
        }
        const experience = experiences[item.experience.id];
        if (!experience) {
            return null;
        }
        return (
            <ListItem
                onClick={onClick}
                selectedWaiver={selectedWaiver}
                order={this.props.order}
                item={this.props.item}
            />
        );
    }
}

const mapStateToProps = (state, props) => ({
    experiences: state.experiences.collection,
});

export default connect(mapStateToProps)(WaiverExperienceListItem);
