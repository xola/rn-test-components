import xolaApi from '../api/xolaApi';

const PaymentDeviceService = {
    async saveReader(sellerId, serialNumber) {
        const reader = {
            label: serialNumber,
            type: 'bbpos',
            serialNumber,
        };

        const response = await xolaApi.post(
            `/api/users/${sellerId}/preferences/stripeTerminal/paymentDevices`,
            reader,
            { params: { authenticate: true } },
        );

        return response.data;
    },

    async pairReader(sellerId, deviceId, computer) {
        const response = await xolaApi.post(
            `/api/users/${sellerId}/preferences/stripeTerminal/paymentDevices/${deviceId}/computer`,
            computer,
            { params: { authenticate: true } },
        );

        return response.data;
    },

    unpairReader(sellerId, readerId, computerId) {
        return xolaApi.delete(
            `/api/users/${sellerId}/preferences/stripeTerminal/paymentDevices/${readerId}/computer/${computerId}`,
            { params: { authenticate: true } },
        );
    },
};

export default PaymentDeviceService;
