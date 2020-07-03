export const getActiveItem = state => {
    const { selectedOrder, selectedItem, collection, itemIndex } = state.order;

    if (state.cart.submittedOrder) {
        return state.cart.submittedOrder.items[state.cart.itemIndex];
    }

    if (selectedOrder) {
        if (selectedItem) {
            return collection[selectedOrder].items.find(item => item.id === selectedItem);
        }

        return collection[selectedOrder].items[itemIndex];
    }

    return null;
};

export const getActiveOrder = state => {
    const { selectedOrder, collection } = state.order;

    if (state.cart.submittedOrder) {
        return state.cart.submittedOrder;
    }

    if (selectedOrder) {
        return collection[selectedOrder];
    }

    return null;
};
