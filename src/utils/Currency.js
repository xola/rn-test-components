import { NativeModules, Platform } from 'react-native';

const userLocale =
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale
        : NativeModules.I18nManager.localeIdentifier;

export const format = (amount, currency, locale = userLocale) => {
    if (locale) {
        locale = locale.replace('_', '-');
    }
    const style = currency ? 'currency' : 'decimal';
    return new Intl.NumberFormat(locale, { style, currency }).format(amount);
};

export const getSymbol = (currency, locale = userLocale) => {
    const style = currency ? 'currency' : 'decimal';

    return (0)
        .toLocaleString(locale, { style, currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })
        .replace(/\d/g, '')
        .trim();
};
