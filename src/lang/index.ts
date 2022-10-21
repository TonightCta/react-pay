import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import zhTW from "./zh_TW.json";
import zhCN from './zh_CN.json'

const resources = {
    en: {
        translation: en
    },
    zh_CN: {
        translation: zhCN
    },
    zh_TW: {
        translation: zhTW
    },
};
i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;

