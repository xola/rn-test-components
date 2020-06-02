export const getActiveItem = state => {
    const { selectedOrder, selectedItem, collection, itemIndex } = state.order;

    if (selectedOrder) {
        if (selectedItem) {
            return collection[selectedOrder].items.find(item => item.id === selectedItem);
        }

        return collection[selectedOrder].items[itemIndex];
    }

    return state.cart.preparedOrder.items[0];
};
