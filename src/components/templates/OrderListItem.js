import React, { Component } from 'react';
import LoadingButton from '../common/LoadingButton';
import CustomIcon from '../common/CustomIcon';
import StyledText from '../common/StyledText';
import ListItem from './ListItem';
import { connect } from 'react-redux';

class OrderListItem extends Component {
    state = {
        isLoading: false,
    };

    handleCheckIn = async () => {
        this.setState({ isLoading: true });
        await this.props.onClick(this.props.order, this.props.item);
        this.setState({ isLoading: false });
    };

    renderActionButton() {
        const { item } = this.props;
        const isCheckedIn = item.guestStatus === 'arrived';
        return isCheckedIn ? (
            <LoadingButton
                styleNames={['medium', 'success']}
                title={
                    <StyledText styleNames={['h3']}>
                        <CustomIcon name="tick-bold" /> Checked in
                    </StyledText>
                }
            />
        ) : (
            <LoadingButton
                onPress={this.handleCheckIn}
                isLoading={this.state.isLoading}
                styleNames={['medium', 'empty']}
                title="Check In"
            />
        );
    }

    render() {
        const { experiences, item } = this.props;
        if (!item.experience) {
            return null;
        }
        const experience = experiences[item.experience.id];
        if (!experience) {
            return null;
        }
        return <ListItem actionButton={this.renderActionButton()} order={this.props.order} item={this.props.item} />;
    }
}

const mapStateToProps = state => ({
    experiences: state.experiences.collection,
});

export default connect(mapStateToProps)(OrderListItem);
