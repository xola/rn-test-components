import StripeTerminal from 'crowdbotics-react-native-stripe-terminal';
import { commitOrder } from './orderActions';

export const PAYMENT_FAILED = 'PAYMENT_FAILED';

export const INIT_PAYMENT_REQUESTED = 'INIT_PAYMENT_REQUESTED';
export const INIT_PAYMENT_FAILED = 'INIT_PAYMENT_FAILED';
export const INIT_PAYMENT_SUCCEEDED = 'INIT_PAYMENT_SUCCEEDED';

export const COLLECT_PAYMENT_REQUESTED = 'COLLECT_PAYMENT_REQUESTED';
export const COLLECT_PAYMENT_FAILED = 'COLLECT_PAYMENT_FAILED';
export const COLLECT_PAYMENT_SUCCEEDED = 'COLLECT_PAYMENT_SUCCEEDED';

export const CONFIRM_PAYMENT_REQUESTED = 'PAYMENT_CONFIRMATION_REQUESTED';
export const CONFIRM_PAYMENT_FAILED = 'PAYMENT_CONFIRMATION_FAILED';
export const CONFIRM_PAYMENT_SUCCEEDED = 'PAYMENT_CONFIRMATION_SUCCEEDED';

export const OPEN_PAYMENT_MODAL = 'OPEN_PAYMENT_MODAL';
export const CLOSE_PAYMENT_MODAL = 'CLOSE_PAYMENT_MODAL';

export const startPaymentCollection = options => async (dispatch, getState) => {
    try {
        dispatch({ type: INIT_PAYMENT_REQUESTED });
        const { submittedOrder } = getState().cart;

        const intent = submittedOrder.paymentIntents ? submittedOrder.paymentIntents[0] : null;
        if (!intent) {
            dispatch({ type: INIT_PAYMENT_FAILED, error: 'Payment intent not created' });
            return;
        }
        let response = await StripeTerminal.retrievePaymentIntent(intent.clientSecret);

        if (response.error) {
            dispatch({ type: INIT_PAYMENT_FAILED, error: response.error.message });
            return;
        }
        dispatch({ type: INIT_PAYMENT_SUCCEEDED, intent: intent });

        dispatch({ type: COLLECT_PAYMENT_REQUESTED });
        response = await StripeTerminal.collectPaymentMethod();

        if (response.error) {
            dispatch({ type: COLLECT_PAYMENT_FAILED, error: response.error.message });
            return;
        }
        dispatch({ type: COLLECT_PAYMENT_SUCCEEDED });

        dispatch({ type: CONFIRM_PAYMENT_REQUESTED });
        response = await StripeTerminal.processPayment(response.paymentIntent);

        if (response.error) {
            dispatch({ type: CONFIRM_PAYMENT_FAILED, error: response.error.message });
            return;
        }
        dispatch({ type: CONFIRM_PAYMENT_SUCCEEDED });

        dispatch(commitOrder());
    } catch (e) {
        dispatch({ type: PAYMENT_FAILED, error: e.error });
    }
};

export const openModal = () => ({
    type: OPEN_PAYMENT_MODAL,
});

export const closeModal = () => ({
    type: CLOSE_PAYMENT_MODAL,
});
