import { format } from '../../utils/Currency';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Component } from 'react';

class Currency extends Component {
    static propTypes = {
        currency: PropTypes.string,
        children: PropTypes.number,
    };

    render() {
        const { currency = 'USD', children: amount = 0 } = this.props;
        return format(amount, currency);
    }
}

const mapStateToProps = state => ({
    currency: state.auth.seller.currency,
});

export default connect(mapStateToProps)(Currency);
