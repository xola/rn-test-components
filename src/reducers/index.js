import errorsReducer from './errorsReducer';
import bootstrapReducer from './bootstrapReducer';

const rootReducer = {
    bootstrap: bootstrapReducer,
    errors: errorsReducer,
};

export default rootReducer;
