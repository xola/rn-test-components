import errorsReducer from './errorsReducer';
import authReducer from './authReducer';
import experiencesReducer from './experiencesReducer';
import dateReducer from './dateReducer';
import orderReducer from './orderReducer';
import readersReducer from './readersReducer';
import cartReducer from './cartReducer';
import paymentReducer from './paymentReducer';
import bootstrapReducer from './bootstrapReducer';

const rootReducer = {
    bootstrap: bootstrapReducer,
    errors: errorsReducer,
    auth: authReducer,
    experiences: experiencesReducer,
    date: dateReducer,
    order: orderReducer,
    cart: cartReducer,
    readers: readersReducer,
    payment: paymentReducer,
};

export default rootReducer;
