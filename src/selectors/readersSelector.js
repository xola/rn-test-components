import _ from 'lodash';

export const getPairedReader = state => {
    const paymentDevices = _.get(state, 'auth.seller.preferences.stripeTerminal.paymentDevices', []);
    const computerId = _.get(state, 'readers.computer.id');
    return computerId ? _.find(paymentDevices, { computer: { id: computerId } }) : null;
};
