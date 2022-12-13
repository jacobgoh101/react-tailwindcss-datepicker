import dayjs from 'dayjs';
import React, { createContext, useContext, useCallback, useState, useEffect, useMemo, useRef } from 'react';

const DatepickerContext = createContext({
    primaryColor: "blue",
    calendarContainer: null,
    arrowContainer: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    hideDatepicker: () => { },
    period: { start: null, end: null },
    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    changePeriod: period => { },
    dayHover: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    changeDayHover: (day) => { },
    inputText: "",
    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    changeInputText: text => { },
    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    updateFirstDate: date => { },
    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    changeDatepickerValue: value => { },
    showFooter: false,
    value: null,
    i18n: "en",
    disabled: false,
    inputClassName: "",
    containerClassName: ""
});

function getTextColorByPrimaryColor(color) {
    switch (color) {
        case "blue":
            return "text-blue-500";
        case "orange":
            return "text-orange-500";
        case "yellow":
            return "text-yellow-500";
        case "red":
            return "text-red-500";
        case "purple":
            return "text-purple-500";
        case "amber":
            return "text-amber-500";
        case "lime":
            return "text-lime-500";
        case "green":
            return "text-green-500";
        case "emerald":
            return "text-emerald-500";
        case "teal":
            return "text-teal-500";
        case "cyan":
            return "text-cyan-500";
        case "sky":
            return "text-sky-500";
        case "indigo":
            return "text-indigo-500";
        case "violet":
            return "text-violet-500";
        case "fuchsia":
            return "text-fuchsia-500";
        case "pink":
            return "text-pink-500";
        case "rose":
            return "text-rose-500";
        default:
            return "";
    }
}
function generateArrayNumber(start = 0, end = 0) {
    const array = [];
    for (let i = start; i <= end; i++) {
        array.push(i);
    }
    return array;
}
function shortString(value, limit = 3) {
    return value.slice(0, limit);
}
function ucFirst(value) {
    return `${value[0].toUpperCase()}${value.slice(1, value.length)}`;
}
function formatDate(date, format = "YYYY-MM-DD") {
    return date.format(format);
}
function getFirstDayInMonth(date) {
    return {
        ddd: formatDate(dayjs(date).startOf("month"), "ddd"),
        basic: formatDate(dayjs(date).startOf("month")),
        object: dayjs(date).startOf("month")
    };
}
function getDaysInMonth(date) {
    if (!isNaN(dayjs(date).daysInMonth())) {
        return [...generateArrayNumber(1, dayjs(date).daysInMonth())];
    }
    return [];
}
function nextMonth(date) {
    return date
        .date(1)
        .hour(0)
        .minute(0)
        .second(0)
        .month(date.month() + 1);
}
function previousMonth(date) {
    return date
        .date(1)
        .hour(0)
        .minute(0)
        .second(0)
        .month(date.month() - 1);
}
function getFirstElementsInArray(array = [], size = 0) {
    return array.slice(0, size);
}
function getLastElementsInArray(array = [], size = 0) {
    const result = [];
    if (Array.isArray(array) && size > 0) {
        if (size >= array.length) {
            return array;
        }
        let y = array.length - 1;
        for (let i = 0; i < size; i++) {
            result.push(array[y]);
            y--;
        }
    }
    return result.reverse();
}
function getNumberOfDay(dayString) {
    let number = 0;
    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].forEach((item, index) => {
        if (item.includes(dayString)) {
            number = index + 1;
        }
    });
    return number;
}
function getLastDaysInMonth(date, size = 0) {
    return getLastElementsInArray(getDaysInMonth(date), size);
}
function getFirstDaysInMonth(date, size = 0) {
    return getFirstElementsInArray(getDaysInMonth(date), size);
}
function loadLanguageModule(language = "en") {
    switch (language) {
        case "af":
            require("dayjs/locale/af");
            break;
        case "am":
            require("dayjs/locale/am");
            break;
        case "ar-dz":
            require("dayjs/locale/ar-dz");
            break;
        case "ar-iq":
            require("dayjs/locale/ar-iq");
            break;
        case "ar-kw":
            require("dayjs/locale/ar-kw");
            break;
        case "ar-ly":
            require("dayjs/locale/ar-ly");
            break;
        case "ar-ma":
            require("dayjs/locale/ar-ma");
            break;
        case "ar-sa":
            require("dayjs/locale/ar-sa");
            break;
        case "ar-tn":
            require("dayjs/locale/ar-tn");
            break;
        case "ar":
            require("dayjs/locale/ar");
            break;
        case "az":
            require("dayjs/locale/az");
            break;
        case "bg":
            require("dayjs/locale/bg");
            break;
        case "bi":
            require("dayjs/locale/bi");
            break;
        case "bm":
            require("dayjs/locale/bm");
            break;
        case "bn-bd":
            require("dayjs/locale/bn-bd");
            break;
        case "bn":
            require("dayjs/locale/bn");
            break;
        case "bo":
            require("dayjs/locale/bo");
            break;
        case "br":
            require("dayjs/locale/br");
            break;
        case "ca":
            require("dayjs/locale/ca");
            break;
        case "cs":
            require("dayjs/locale/cs");
            break;
        case "cv":
            require("dayjs/locale/cv");
            break;
        case "cy":
            require("dayjs/locale/cy");
            break;
        case "da":
            require("dayjs/locale/da");
            break;
        case "de-at":
            require("dayjs/locale/de-at");
            break;
        case "de-ch":
            require("dayjs/locale/de-ch");
            break;
        case "de":
            require("dayjs/locale/de");
            break;
        case "dv":
            require("dayjs/locale/dv");
            break;
        case "el":
            require("dayjs/locale/el");
            break;
        case "en-au":
            require("dayjs/locale/en-au");
            break;
        case "en-gb":
            require("dayjs/locale/en-gb");
            break;
        case "en-ie":
            require("dayjs/locale/en-ie");
            break;
        case "en-il":
            require("dayjs/locale/en-il");
            break;
        case "en-in":
            require("dayjs/locale/en-in");
            break;
        case "en-nz":
            require("dayjs/locale/en-nz");
            break;
        case "en-sg":
            require("dayjs/locale/en-sg");
            break;
        case "en-tt":
            require("dayjs/locale/en-tt");
            break;
        case "en":
            require("dayjs/locale/en");
            break;
        case "eo":
            require("dayjs/locale/eo");
            break;
        case "es-do":
            require("dayjs/locale/es-do");
            break;
        case "es-mx":
            require("dayjs/locale/es-mx");
            break;
        case "es-pr":
            require("dayjs/locale/es-pr");
            break;
        case "es-us":
            require("dayjs/locale/es-us");
            break;
        case "es":
            require("dayjs/locale/es");
            break;
        case "et":
            require("dayjs/locale/et");
            break;
        case "eu":
            require("dayjs/locale/eu");
            break;
        case "fa":
            require("dayjs/locale/fa");
            break;
        case "fi":
            require("dayjs/locale/fi");
            break;
        case "fo":
            require("dayjs/locale/fo");
            break;
        case "fr-ch":
            require("dayjs/locale/fr-ch");
            break;
        case "fr":
            require("dayjs/locale/fr");
            break;
        case "fy":
            require("dayjs/locale/fy");
            break;
        case "ga":
            require("dayjs/locale/ga");
            break;
        case "gd":
            require("dayjs/locale/gd");
            break;
        case "gl":
            require("dayjs/locale/gl");
            break;
        case "gom-latn":
            require("dayjs/locale/gom-latn");
            break;
        case "gu":
            require("dayjs/locale/gu");
            break;
        case "he":
            require("dayjs/locale/he");
            break;
        case "hi":
            require("dayjs/locale/hi");
            break;
        case "hr":
            require("dayjs/locale/hr");
            break;
        case "ht":
            require("dayjs/locale/ht");
            break;
        case "hu":
            require("dayjs/locale/hu");
            break;
        case "hy-am":
            require("dayjs/locale/hy-am");
            break;
        case "id":
            require("dayjs/locale/id");
            break;
        case "is":
            require("dayjs/locale/is");
            break;
        case "it-ch":
            require("dayjs/locale/it-ch");
            break;
        case "it":
            require("dayjs/locale/it");
            break;
        case "ja":
            require("dayjs/locale/ja");
            break;
        case "jv":
            require("dayjs/locale/jv");
            break;
        case "ka":
            require("dayjs/locale/ka");
            break;
        case "kk":
            require("dayjs/locale/kk");
            break;
        case "ko":
            require("dayjs/locale/ko");
            break;
        case "ku":
            require("dayjs/locale/ku");
            break;
        case "ky":
            require("dayjs/locale/ky");
            break;
        case "lb":
            require("dayjs/locale/lb");
            break;
        case "lo":
            require("dayjs/locale/lo");
            break;
        case "lt":
            require("dayjs/locale/lt");
            break;
        case "lv":
            require("dayjs/locale/lv");
            break;
        case "me":
            require("dayjs/locale/me");
            break;
        case "mi":
            require("dayjs/locale/mi");
            break;
        case "mk":
            require("dayjs/locale/mk");
            break;
        case "ml":
            require("dayjs/locale/ml");
            break;
        case "mn":
            require("dayjs/locale/mn");
            break;
        case "ms-my":
            require("dayjs/locale/ms-my");
            break;
        case "ms":
            require("dayjs/locale/ms");
            break;
        case "mt":
            require("dayjs/locale/mt");
            break;
        case "my":
            require("dayjs/locale/my");
            break;
        case "nb":
            require("dayjs/locale/nb");
            break;
        case "ne":
            require("dayjs/locale/ne");
            break;
        case "nl-be":
            require("dayjs/locale/nl-be");
            break;
        case "nl":
            require("dayjs/locale/nl");
            break;
        case "nn":
            require("dayjs/locale/nn");
            break;
        case "oc-lnc":
            require("dayjs/locale/oc-lnc");
            break;
        case "pa-in":
            require("dayjs/locale/pa-in");
            break;
        case "pl":
            require("dayjs/locale/pl");
            break;
        case "pt-br":
            require("dayjs/locale/pt-br");
            break;
        case "pt":
            require("dayjs/locale/pt");
            break;
        case "rn":
            require("dayjs/locale/rn");
            break;
        case "ro":
            require("dayjs/locale/ro");
            break;
        case "ru":
            require("dayjs/locale/ru");
            break;
        case "rw":
            require("dayjs/locale/rw");
            break;
        case "sd":
            require("dayjs/locale/sd");
            break;
        case "se":
            require("dayjs/locale/se");
            break;
        case "si":
            require("dayjs/locale/si");
            break;
        case "sk":
            require("dayjs/locale/sk");
            break;
        case "sl":
            require("dayjs/locale/sl");
            break;
        case "sq":
            require("dayjs/locale/sq");
            break;
        case "sr":
            require("dayjs/locale/sr");
            break;
        case "sr-cyrl":
            require("dayjs/locale/sr-cyrl");
            break;
        case "ss":
            require("dayjs/locale/ss");
            break;
        case "sv-fi":
            require("dayjs/locale/sv-fi");
            break;
        case "sv":
            require("dayjs/locale/sv");
            break;
        case "sw":
            require("dayjs/locale/sw");
            break;
        case "ta":
            require("dayjs/locale/ta");
            break;
        case "te":
            require("dayjs/locale/te");
            break;
        case "tg":
            require("dayjs/locale/tg");
            break;
        case "th":
            require("dayjs/locale/th");
            break;
        case "tk":
            require("dayjs/locale/tk");
            break;
        case "tl-ph":
            require("dayjs/locale/tl-ph");
            break;
        case "tlh":
            require("dayjs/locale/tlh");
            break;
        case "tr":
            require("dayjs/locale/tr");
            break;
        case "tzl":
            require("dayjs/locale/tzl");
            break;
        case "tzm-latn":
            require("dayjs/locale/tzm-latn");
            break;
        case "tzm":
            require("dayjs/locale/tzm");
            break;
        case "ug-cn":
            require("dayjs/locale/ug-cn");
            break;
        case "uk":
            require("dayjs/locale/uk");
            break;
        case "ur":
            require("dayjs/locale/ur");
            break;
        case "uz-latn":
            require("dayjs/locale/uz-latn");
            break;
        case "uz":
            require("dayjs/locale/uz");
            break;
        case "vi":
            require("dayjs/locale/vi");
            break;
        case "x-pseudo":
            require("dayjs/locale/x-pseudo");
            break;
        case "yo":
            require("dayjs/locale/yo");
            break;
        case "zh-cn":
            require("dayjs/locale/zh-cn");
            break;
        case "zh-hk":
            require("dayjs/locale/zh-hk");
            break;
        case "zh-tw":
            require("dayjs/locale/zh-tw");
            break;
        case "zh":
            require("dayjs/locale/zh");
            break;
        default:
            require("dayjs/locale/en");
            break;
    }
}
function dateIsValid(date) {
    return date instanceof Date && !isNaN(date.getTime());
}

const COLORS = [
    "blue",
    "orange",
    "yellow",
    "red",
    "purple",
    "amber",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose"
];
const DEFAULT_COLOR = "blue";
const BG_COLOR = {
    100: {
        blue: "bg-blue-100",
        orange: "bg-orange-100",
        yellow: "bg-yellow-100",
        red: "bg-red-100",
        purple: "bg-purple-100",
        amber: "bg-amber-100",
        lime: "bg-lime-100",
        green: "bg-green-100",
        emerald: "bg-emerald-100",
        teal: "bg-teal-100",
        cyan: "bg-cyan-100",
        sky: "bg-sky-100",
        indigo: "bg-indigo-100",
        violet: "bg-violet-100",
        fuchsia: "bg-fuchsia-100",
        pink: "bg-pink-100",
        rose: "bg-rose-100"
    },
    200: {
        blue: "bg-blue-200",
        orange: "bg-orange-200",
        yellow: "bg-yellow-200",
        red: "bg-red-200",
        purple: "bg-purple-200",
        amber: "bg-amber-200",
        lime: "bg-lime-200",
        green: "bg-green-200",
        emerald: "bg-emerald-200",
        teal: "bg-teal-200",
        cyan: "bg-cyan-200",
        sky: "bg-sky-200",
        indigo: "bg-indigo-200",
        violet: "bg-violet-200",
        fuchsia: "bg-fuchsia-200",
        pink: "bg-pink-200",
        rose: "bg-rose-200"
    },
    500: {
        blue: "bg-primary",
        orange: "bg-orange-500",
        yellow: "bg-yellow-500",
        red: "bg-red-500",
        purple: "bg-purple-500",
        amber: "bg-amber-500",
        lime: "bg-lime-500",
        green: "bg-green-500",
        emerald: "bg-emerald-500",
        teal: "bg-teal-500",
        cyan: "bg-cyan-500",
        sky: "bg-sky-500",
        indigo: "bg-indigo-500",
        violet: "bg-violet-500",
        fuchsia: "bg-fuchsia-500",
        pink: "bg-pink-500",
        rose: "bg-rose-500"
    },
    hover: {
        blue: "hover:bg-blue-600",
        orange: "hover:bg-orange-600",
        yellow: "hover:bg-yellow-600",
        red: "hover:bg-red-600",
        purple: "hover:bg-purple-600",
        amber: "hover:bg-amber-600",
        lime: "hover:bg-lime-600",
        green: "hover:bg-green-600",
        emerald: "hover:bg-emerald-600",
        teal: "hover:bg-teal-600",
        cyan: "hover:bg-cyan-600",
        sky: "hover:bg-sky-600",
        indigo: "hover:bg-indigo-600",
        violet: "hover:bg-violet-600",
        fuchsia: "hover:bg-fuchsia-600",
        pink: "hover:bg-pink-600",
        rose: "hover:bg-rose-600"
    }
};
const TEXT_COLOR = {
    600: {
        blue: "text-blue-600 dark:text-blue-400 dark:hover:text-blue-400",
        orange: "text-orange-600 dark:text-orange-400 dark:hover:text-orange-400",
        yellow: "text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-400",
        red: "text-red-600 dark:text-red-400 dark:hover:text-red-400",
        purple: "text-purple-600 dark:text-purple-400 dark:hover:text-purple-400",
        amber: "text-amber-600 dark:text-amber-400 dark:hover:text-amber-400",
        lime: "text-lime-600 dark:text-lime-400 dark:hover:text-lime-400",
        green: "text-green-600 dark:text-green-400 dark:hover:text-green-400",
        emerald: "text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-400",
        teal: "text-teal-600 dark:text-teal-400 dark:hover:text-teal-400",
        cyan: "text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-400",
        sky: "text-sky-600 dark:text-sky-400 dark:hover:text-sky-400",
        indigo: "text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-400",
        violet: "text-violet-600 dark:text-violet-400 dark:hover:text-violet-400",
        fuchsia: "text-fuchsia-600 dark:text-fuchsia-400 dark:hover:text-fuchsia-400",
        pink: "text-pink-600 dark:text-pink-400 dark:hover:text-pink-400",
        rose: "text-rose-600 dark:text-rose-400 dark:hover:text-rose-400"
    },
    hover: {
        blue: "hover:text-blue-700",
        orange: "hover:text-orange-700",
        yellow: "hover:text-yellow-700",
        red: "hover:text-red-700",
        purple: "hover:text-purple-700",
        amber: "hover:text-amber-700",
        lime: "hover:text-lime-700",
        green: "hover:text-green-700",
        emerald: "hover:text-emerald-700",
        teal: "hover:text-teal-700",
        cyan: "hover:text-cyan-700",
        sky: "hover:text-sky-700",
        indigo: "hover:text-indigo-700",
        violet: "hover:text-violet-700",
        fuchsia: "hover:text-fuchsia-700",
        pink: "hover:text-pink-700",
        rose: "hover:text-rose-700"
    }
};
const BORDER_COLOR = {
    500: {
        blue: "border-blue-500",
        orange: "border-orange-500",
        yellow: "border-yellow-500",
        red: "border-red-500",
        purple: "border-purple-500",
        amber: "border-amber-500",
        lime: "border-lime-500",
        green: "border-green-500",
        emerald: "border-emerald-500",
        teal: "border-teal-500",
        cyan: "border-cyan-500",
        sky: "border-sky-500",
        indigo: "border-indigo-500",
        violet: "border-violet-500",
        fuchsia: "border-fuchsia-500",
        pink: "border-pink-500",
        rose: "border-rose-500"
    },
    focus: {
        blue: "focus:border-blue-500",
        orange: "focus:border-orange-500",
        yellow: "focus:border-yellow-500",
        red: "focus:border-red-500",
        purple: "focus:border-purple-500",
        amber: "focus:border-amber-500",
        lime: "focus:border-lime-500",
        green: "focus:border-green-500",
        emerald: "focus:border-emerald-500",
        teal: "focus:border-teal-500",
        cyan: "focus:border-cyan-500",
        sky: "focus:border-sky-500",
        indigo: "focus:border-indigo-500",
        violet: "focus:border-violet-500",
        fuchsia: "focus:border-fuchsia-500",
        pink: "focus:border-pink-500",
        rose: "focus:border-rose-500"
    }
};
const RING_COLOR = {
    focus: {
        blue: "focus:ring-blue-500",
        orange: "focus:ring-orange-500",
        yellow: "focus:ring-yellow-500",
        red: "focus:ring-red-500",
        purple: "focus:ring-purple-500",
        amber: "focus:ring-amber-500",
        lime: "focus:ring-lime-500",
        green: "focus:ring-green-500",
        emerald: "focus:ring-emerald-500",
        teal: "focus:ring-teal-500",
        cyan: "focus:ring-cyan-500",
        sky: "focus:ring-sky-500",
        indigo: "focus:ring-indigo-500",
        violet: "focus:ring-violet-500",
        fuchsia: "focus:ring-fuchsia-500",
        pink: "focus:ring-pink-500",
        rose: "focus:ring-rose-500"
    },
    "second-focus": {
        blue: "focus:ring-blue-500/20",
        orange: "focus:ring-orange-500/20",
        yellow: "focus:ring-yellow-500/20",
        red: "focus:ring-red-500/20",
        purple: "focus:ring-purple-500/20",
        amber: "focus:ring-amber-500/20",
        lime: "focus:ring-lime-500/20",
        green: "focus:ring-green-500/20",
        emerald: "focus:ring-emerald-500/20",
        teal: "focus:ring-teal-500/20",
        cyan: "focus:ring-cyan-500/20",
        sky: "focus:ring-sky-500/20",
        indigo: "focus:ring-indigo-500/20",
        violet: "focus:ring-violet-500/20",
        fuchsia: "focus:ring-fuchsia-500/20",
        pink: "focus:ring-pink-500/20",
        rose: "focus:ring-rose-500/20"
    }
};
const DEFAULT_SHORTCUTS = {
    today: {
        text: "Today",
        period: {
            start: formatDate(dayjs()),
            end: formatDate(dayjs())
        }
    },
    yesterday: {
        text: "Yesterday",
        period: {
            start: formatDate(dayjs().subtract(1, "d")),
            end: formatDate(dayjs().subtract(1, "d"))
        }
    },
    past: [
        {
            daysNumber: 7,
            text: "Last 7 days",
            period: {
                start: formatDate(dayjs().subtract(7, "d")),
                end: formatDate(dayjs())
            }
        },
        {
            daysNumber: 30,
            text: "Last 30 days",
            period: {
                start: formatDate(dayjs().subtract(30, "d")),
                end: formatDate(dayjs())
            }
        }
    ],
    currentMonth: {
        text: "This month",
        period: {
            start: formatDate(dayjs().startOf("month")),
            end: formatDate(dayjs().endOf("month"))
        }
    },
    pastMonth: {
        text: "Last month",
        period: {
            start: formatDate(previousMonth(dayjs()).startOf("month")),
            end: formatDate(previousMonth(dayjs()).endOf("month"))
        }
    }
};

const DateIcon = ({ className = "w-6 h-6" }) => {
    return (React.createElement("svg", { className: className, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" })));
};
const CloseIcon = ({ className = "w-6 h-6" }) => {
    return (React.createElement("svg", { className: className, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })));
};
const ChevronLeftIcon = ({ className = "w-6 h-6" }) => {
    return (React.createElement("svg", { className: className, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 19.5L8.25 12l7.5-7.5" })));
};
const DoubleChevronLeftIcon = ({ className = "w-6 h-6" }) => {
    return (React.createElement("svg", { className: className, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" })));
};
const ChevronRightIcon = ({ className = "w-6 h-6" }) => {
    return (React.createElement("svg", { className: className, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.25 4.5l7.5 7.5-7.5 7.5" })));
};
const DoubleChevronRightIcon = ({ className = "w-6 h-6" }) => {
    return (React.createElement("svg", { className: className, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" })));
};
// eslint-disable-next-line react/display-name,@typescript-eslint/ban-types
const Arrow = React.forwardRef((props, ref) => {
    return (React.createElement("div", { ref: ref, className: "absolute z-20 h-4 w-4 rotate-45 mt-0.5 ml-[1.2rem] border-l border-t border-gray-300 bg-white dark:bg-slate-800 dark:border-slate-600" }));
});
const SecondaryButton = ({ children, onClick, disabled = false }) => {
    // Contexts
    const { primaryColor } = useContext(DatepickerContext);
    // Functions
    const getClassName = useCallback(() => {
        const ringColor = RING_COLOR.focus[primaryColor];
        return `w-full transition-all duration-300 bg-white dark:text-gray-700 font-medium border border-gray-300 px-4 py-2 text-sm rounded-md focus:ring-2 focus:ring-offset-2 hover:bg-gray-50 ${ringColor}`;
    }, [primaryColor]);
    return (React.createElement("button", { type: "button", className: getClassName(), onClick: onClick, disabled: disabled }, children));
};
const PrimaryButton = ({ children, onClick, disabled = false }) => {
    // Contexts
    const { primaryColor } = useContext(DatepickerContext);
    const bgColor = BG_COLOR["500"][primaryColor];
    const borderColor = BORDER_COLOR["500"][primaryColor];
    const bgColorHover = BG_COLOR.hover[primaryColor];
    const ringColor = RING_COLOR.focus[primaryColor];
    // Functions
    const getClassName = useCallback(() => {
        return `w-full transition-all duration-300 ${bgColor} ${borderColor} text-white font-medium border px-4 py-2 text-sm rounded-md focus:ring-2 focus:ring-offset-2 ${bgColorHover} ${ringColor} ${disabled ? " cursor-no-drop" : ""}`;
    }, [bgColor, bgColorHover, borderColor, disabled, ringColor]);
    return (React.createElement("button", { type: "button", className: getClassName(), onClick: onClick, disabled: disabled }, children));
};
const RoundedButton = ({ children, onClick, roundedFull = false, padding = "py-[0.55rem]" }) => {
    // Contexts
    const { primaryColor } = useContext(DatepickerContext);
    // Functions
    const getClassName = useCallback(() => {
        const darkClass = "dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10";
        const defaultClass = !roundedFull
            ? `w-full tracking-wide ${darkClass} transition-all duration-300 px-3 ${padding} uppercase hover:bg-gray-100 rounded-md focus:ring-1`
            : `${darkClass} transition-all duration-300 hover:bg-gray-100 rounded-full p-[0.45rem] focus:ring-1`;
        switch (primaryColor) {
            case "blue":
                return `${defaultClass} focus:ring-blue-500/50 focus:bg-blue-100/50`;
            case "orange":
                return `${defaultClass} focus:ring-orange-500/50 focus:bg-orange-100/50`;
            case "yellow":
                return `${defaultClass} focus:ring-yellow-500/50 focus:bg-yellow-100/50`;
            case "red":
                return `${defaultClass} focus:ring-red-500/50 focus:bg-red-100/50`;
            case "purple":
                return `${defaultClass} focus:ring-purple-500/50 focus:bg-purple-100/50`;
            case "amber":
                return `${defaultClass} focus:ring-amber-500/50 focus:bg-amber-100/50`;
            case "lime":
                return `${defaultClass} focus:ring-lime-500/50 focus:bg-lime-100/50`;
            case "green":
                return `${defaultClass} focus:ring-green-500/50 focus:bg-green-100/50`;
            case "emerald":
                return `${defaultClass} focus:ring-emerald-500/50 focus:bg-emerald-100/50`;
            case "teal":
                return `${defaultClass} focus:ring-teal-500/50 focus:bg-teal-100/50`;
            case "cyan":
                return `${defaultClass} focus:ring-cyan-500/50 focus:bg-cyan-100/50`;
            case "sky":
                return `${defaultClass} focus:ring-sky-500/50 focus:bg-sky-100/50`;
            case "indigo":
                return `${defaultClass} focus:ring-indigo-500/50 focus:bg-indigo-100/50`;
            case "violet":
                return `${defaultClass} focus:ring-violet-500/50 focus:bg-violet-100/50`;
            case "fuchsia":
                return `${defaultClass} focus:ring-fuchsia-500/50 focus:bg-fuchsia-100/50`;
            case "pink":
                return `${defaultClass} focus:ring-pink-500/50 focus:bg-pink-100/50`;
            case "rose":
                return `${defaultClass} focus:ring-rose-500/50 focus:bg-rose-100/50`;
            default:
                return "";
        }
    }, [padding, primaryColor, roundedFull]);
    return (React.createElement("button", { type: "button", className: getClassName(), onClick: onClick }, children));
};
const VerticalDash = () => {
    // Contexts
    const { primaryColor } = useContext(DatepickerContext);
    const bgColor = BG_COLOR["500"][primaryColor];
    return React.createElement("div", { className: `bg-blue-500 h-7 w-1 rounded-full hidden md:block ${bgColor}` });
};

const isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);
const Days = ({ calendarData, onClickPreviousDays, onClickDay, onClickNextDays }) => {
    // Contexts
    const { primaryColor, period, changePeriod, dayHover, changeDayHover } = useContext(DatepickerContext);
    // Functions
    const currentDateClass = useCallback((item) => {
        const itemDate = `${calendarData.date.year()}-${calendarData.date.month() + 1}-${item >= 10 ? item : "0" + item}`;
        if (formatDate(dayjs()) === formatDate(dayjs(itemDate)))
            return getTextColorByPrimaryColor(primaryColor);
        return "";
    }, [calendarData.date, primaryColor]);
    const activeDateData = useCallback((day) => {
        const fullDay = `${calendarData.date.year()}-${calendarData.date.month() + 1}-${day}`;
        let className = "";
        if (dayjs(fullDay).isSame(period.start) && dayjs(fullDay).isSame(period.end)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            className = ` ${BG_COLOR["500"][primaryColor]} text-white font-medium rounded-full`;
        }
        else if (dayjs(fullDay).isSame(period.start)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            className = ` ${BG_COLOR["500"][primaryColor]} text-white font-medium ${dayjs(fullDay).isSame(dayHover) && !period.end
                ? "rounded-full"
                : "rounded-l-full"}`;
        }
        else if (dayjs(fullDay).isSame(period.end)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            className = ` ${BG_COLOR["500"][primaryColor]} text-white font-medium ${dayjs(fullDay).isSame(dayHover) && !period.start
                ? "rounded-full"
                : "rounded-r-full"}`;
        }
        return {
            active: dayjs(fullDay).isSame(period.start) || dayjs(fullDay).isSame(period.end),
            className: className
        };
    }, [calendarData.date, dayHover, period.end, period.start, primaryColor]);
    const hoverClassByDay = useCallback((day) => {
        let className = currentDateClass(day);
        const fullDay = `${calendarData.date.year()}-${calendarData.date.month() + 1}-${day >= 10 ? day : "0" + day}`;
        if (period.start && period.end) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (dayjs(fullDay).isBetween(period.start, period.end, "day", "[)")) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return ` ${BG_COLOR["100"][primaryColor]} ${currentDateClass(day)} dark:bg-white/10`;
            }
        }
        if (!dayHover) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return className;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (period.start && dayjs(fullDay).isBetween(period.start, dayHover, "day", "[)")) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            className = ` ${BG_COLOR["100"][primaryColor]} ${currentDateClass(day)} dark:bg-white/10`;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (period.end && dayjs(fullDay).isBetween(dayHover, period.end, "day", "[)")) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            className = ` ${BG_COLOR["100"][primaryColor]} ${currentDateClass(day)} dark:bg-white/10`;
        }
        if (dayHover === fullDay) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const bgColor = BG_COLOR["500"][primaryColor];
            className = ` transition-all duration-500 text-white font-medium ${bgColor} ${period.start ? "rounded-r-full" : "rounded-l-full"}`;
        }
        return className;
    }, [calendarData.date, currentDateClass, dayHover, period.end, period.start, primaryColor]);
    const buttonCass = useCallback((day) => {
        const baseClass = "flex items-center justify-center w-full h-12 lg:w-10 lg:h-10";
        return `${baseClass}${!activeDateData(day).active
            ? ` ${hoverClassByDay(day)}`
            : activeDateData(day).className}`;
    }, [activeDateData, hoverClassByDay]);
    const hoverDay = useCallback((day, type) => {
        const object = {
            previous: previousMonth(calendarData.date),
            current: calendarData.date,
            next: nextMonth(calendarData.date)
        };
        const newDate = object[type];
        const newHover = `${newDate.year()}-${newDate.month() + 1}-${day >= 10 ? day : "0" + day}`;
        if (period.start && !period.end) {
            if (dayjs(newHover).isBefore(dayjs(period.start))) {
                changePeriod({
                    start: null,
                    end: period.start
                });
            }
            changeDayHover(newHover);
        }
        if (!period.start && period.end) {
            if (dayjs(newHover).isAfter(dayjs(period.end))) {
                changePeriod({
                    start: period.end,
                    end: null
                });
            }
            changeDayHover(newHover);
        }
    }, [calendarData.date, changeDayHover, changePeriod, period.end, period.start]);
    return (React.createElement("div", { className: "grid grid-cols-7 gap-y-0.5 my-1" },
        calendarData.days.previous.map((item, index) => (React.createElement("button", { type: "button", key: index, className: "flex items-center justify-center text-gray-400 w-full h-12 lg:w-10 lg:h-10", onClick: () => onClickPreviousDays(item), onMouseOver: () => {
                hoverDay(item, "previous");
            } }, item))),
        calendarData.days.current.map((item, index) => (React.createElement("button", { type: "button", key: index, className: buttonCass(item), onClick: () => {
                onClickDay(item);
            }, onMouseOver: () => {
                hoverDay(item, "current");
            } }, item))),
        calendarData.days.next.map((item, index) => (React.createElement("button", { type: "button", key: index, className: "flex items-center justify-center text-gray-400 w-full h-12 lg:w-10 lg:h-10", onClick: () => {
                onClickNextDays(item);
            }, onMouseOver: () => {
                hoverDay(item, "next");
            } }, item)))));
};

const Months = ({ clickMonth }) => {
    const { i18n } = useContext(DatepickerContext);
    loadLanguageModule(i18n);
    return (React.createElement("div", { className: "w-full grid grid-cols-2 gap-2 mt-2" }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index) => (React.createElement(RoundedButton, { key: index, padding: "py-3", onClick: () => {
            clickMonth(index + 1);
        } },
        React.createElement(React.Fragment, null, ucFirst(shortString(dayjs(`2022-${1 + item}-01`)
            .locale(i18n)
            .format("MMM")))))))));
};

const Week = () => {
    const { i18n } = useContext(DatepickerContext);
    loadLanguageModule(i18n);
    return (React.createElement("div", { className: "grid grid-cols-7 border-b border-gray-300 dark:border-gray-700 py-2" }, [0, 1, 2, 3, 4, 5, 6].map((item, index) => (React.createElement("div", { key: index, className: "tracking-wide text-gray-500 text-center" }, ucFirst(shortString(dayjs(`2022-11-${6 + item}`)
        .locale(i18n)
        .format("ddd"))))))));
};

const Years = ({ year, clickYear }) => {
    return (React.createElement("div", { className: "w-full grid grid-cols-2 gap-2 mt-2" }, generateArrayNumber(year, year + 11).map((item, index) => (React.createElement(RoundedButton, { key: index, padding: "py-3", onClick: () => {
            clickYear(item);
        } },
        React.createElement(React.Fragment, null, item))))));
};

const Calendar = ({ date, onClickPrevious, onClickNext, changeMonth, changeYear }) => {
    // Contexts
    const { period, changePeriod, changeDayHover, showFooter, changeDatepickerValue, hideDatepicker, asSingle, i18n } = useContext(DatepickerContext);
    loadLanguageModule(i18n);
    // States
    const [showMonths, setShowMonths] = useState(false);
    const [showYears, setShowYears] = useState(false);
    const [year, setYear] = useState(date.year());
    // Functions
    const previous = useCallback(() => {
        return getLastDaysInMonth(previousMonth(date), getNumberOfDay(getFirstDayInMonth(date).ddd) - 1);
    }, [date]);
    const current = useCallback(() => {
        return getDaysInMonth(formatDate(date));
    }, [date]);
    const next = useCallback(() => {
        return getFirstDaysInMonth(previousMonth(date), 42 - (previous().length + current().length));
    }, [current, date, previous]);
    const hiddeMonths = useCallback(() => {
        if (showMonths) {
            setShowMonths(false);
        }
    }, [showMonths]);
    const hiddeYears = useCallback(() => {
        if (showYears) {
            setShowYears(false);
        }
    }, [showYears]);
    const clickMonth = useCallback((month) => {
        setTimeout(() => {
            changeMonth(month);
            setShowMonths(!showMonths);
        }, 250);
    }, [changeMonth, showMonths]);
    const clickYear = useCallback((year) => {
        setTimeout(() => {
            changeYear(year);
            setShowYears(!showYears);
        }, 250);
    }, [changeYear, showYears]);
    const clickDay = useCallback((day, month = date.month() + 1, year = date.year()) => {
        const fullDay = `${year}-${month}-${day}`;
        let newStart;
        let newEnd = null;
        function chosePeriod(start, end) {
            changeDatepickerValue({
                startDate: start,
                endDate: end
            });
            hideDatepicker();
        }
        if (period.start && period.end) {
            if (changeDayHover) {
                changeDayHover(null);
            }
            changePeriod({
                start: null,
                end: null
            });
        }
        if ((!period.start && !period.end) || (period.start && period.end)) {
            if (!period.start && !period.end) {
                changeDayHover(fullDay);
            }
            newStart = fullDay;
            if (asSingle) {
                newEnd = fullDay;
                chosePeriod(fullDay, fullDay);
            }
        }
        else {
            if (period.start && !period.end) {
                // start not null
                // end null
                const condition = dayjs(fullDay).isSame(dayjs(period.start)) ||
                    dayjs(fullDay).isAfter(dayjs(period.start));
                newStart = condition ? period.start : fullDay;
                newEnd = condition ? fullDay : period.start;
            }
            else {
                // Start null
                // End not null
                const condition = dayjs(fullDay).isSame(dayjs(period.end)) ||
                    dayjs(fullDay).isBefore(dayjs(period.end));
                newStart = condition ? fullDay : period.start;
                newEnd = condition ? period.end : fullDay;
            }
            if (!showFooter) {
                if (newStart && newEnd) {
                    chosePeriod(newStart, newEnd);
                }
            }
        }
        if (!(newEnd && newStart) || showFooter) {
            changePeriod({
                start: newStart,
                end: newEnd
            });
        }
    }, [
        asSingle,
        changeDatepickerValue,
        changeDayHover,
        changePeriod,
        date,
        hideDatepicker,
        period.end,
        period.start,
        showFooter
    ]);
    const clickPreviousDays = useCallback((day) => {
        const newDate = previousMonth(date);
        clickDay(day, newDate.month() + 1, newDate.year());
        onClickPrevious();
    }, [clickDay, date, onClickPrevious]);
    const clickNextDays = useCallback((day) => {
        const newDate = nextMonth(date);
        clickDay(day, newDate.month() + 1, newDate.year());
        onClickNext();
    }, [clickDay, date, onClickNext]);
    // UseEffects & UseLayoutEffect
    useEffect(() => {
        setYear(date.year());
    }, [date]);
    // Variables
    const calendarData = useMemo(() => {
        return {
            date: date,
            days: {
                previous: previous(),
                current: current(),
                next: next()
            }
        };
    }, [current, date, next, previous]);
    return (React.createElement("div", { className: "w-full md:w-[297px] md:min-w-[297px]" },
        React.createElement("div", { className: "flex items-center space-x-1.5 border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1.5" },
            !showMonths && !showYears && (React.createElement("div", { className: "flex-none" },
                React.createElement(RoundedButton, { roundedFull: true, onClick: onClickPrevious },
                    React.createElement(ChevronLeftIcon, { className: "h-5 w-5" })))),
            showYears && (React.createElement("div", { className: "flex-none" },
                React.createElement(RoundedButton, { roundedFull: true, onClick: () => {
                        setYear(year - 12);
                    } },
                    React.createElement(DoubleChevronLeftIcon, { className: "h-5 w-5" })))),
            React.createElement("div", { className: "flex flex-1 items-center space-x-1.5" },
                React.createElement("div", { className: "w-1/2" },
                    React.createElement(RoundedButton, { onClick: () => {
                            setShowMonths(!showMonths);
                            hiddeYears();
                        } },
                        React.createElement(React.Fragment, null, shortString(calendarData.date.locale(i18n).format("MMM"))))),
                React.createElement("div", { className: "w-1/2" },
                    React.createElement(RoundedButton, { onClick: () => {
                            setShowYears(!showYears);
                            hiddeMonths();
                        } },
                        React.createElement(React.Fragment, null, calendarData.date.year())))),
            !showMonths && !showYears && (React.createElement("div", { className: "flex-none" },
                React.createElement(RoundedButton, { roundedFull: true, onClick: onClickNext },
                    React.createElement(ChevronRightIcon, { className: "h-5 w-5" })))),
            showYears && (React.createElement("div", { className: "flex-none" },
                React.createElement(RoundedButton, { roundedFull: true, onClick: () => {
                        setYear(year + 12);
                    } },
                    React.createElement(DoubleChevronRightIcon, { className: "h-5 w-5" }))))),
        React.createElement("div", { className: "px-0.5 sm:px-2 mt-0.5 min-h-[285px]" },
            showMonths && React.createElement(Months, { clickMonth: clickMonth }),
            showYears && React.createElement(Years, { year: year, clickYear: clickYear }),
            !showMonths && !showYears && (React.createElement(React.Fragment, null,
                React.createElement(Week, null),
                React.createElement(Days, { calendarData: calendarData, onClickPreviousDays: clickPreviousDays, onClickDay: clickDay, onClickNextDays: clickNextDays }))))));
};

const Footer = () => {
    // Contexts
    const { hideDatepicker, period, changeDatepickerValue, configs } = useContext(DatepickerContext);
    return (React.createElement("div", { className: "flex items-center justify-end pb-2.5 pt-3 border-t border-gray-300 dark:border-gray-700" },
        React.createElement("div", { className: "w-full md:w-auto flex items-center justify-center space-x-3" },
            React.createElement(SecondaryButton, { onClick: () => {
                    hideDatepicker();
                } },
                React.createElement(React.Fragment, null, configs && configs.footer && configs.footer.cancel
                    ? configs.footer.cancel
                    : "Cancel")),
            React.createElement(PrimaryButton, { onClick: () => {
                    if (period.start && period.end) {
                        changeDatepickerValue({
                            startDate: period.start,
                            endDate: period.end
                        });
                        hideDatepicker();
                    }
                }, disabled: !(period.start && period.end) },
                React.createElement(React.Fragment, null, configs && configs.footer && configs.footer.cancel
                    ? configs.footer.apply
                    : "Apply")))));
};

const Input = () => {
    // Context
    const { primaryColor, period, dayHover, changeDayHover, calendarContainer, arrowContainer, inputText, changeInputText, hideDatepicker, changeDatepickerValue, asSingle, placeholder, separator, disabled, inputClassName } = useContext(DatepickerContext);
    // UseRefs
    const buttonRef = useRef(null);
    const inputRef = useRef(null);
    // Functions
    const getClassName = useCallback(() => {
        return inputClassName || "";
        // const border = BORDER_COLOR.focus[primaryColor as keyof typeof BORDER_COLOR.focus];
        // const ring =
        //     RING_COLOR["second-focus"][primaryColor as keyof typeof RING_COLOR["second-focus"]];
        // const classNameOverload = typeof inputClassName === "string" ? inputClassName : "";
        // return twMerge(
        //     "relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed",
        //     border,
        //     ring,
        //     classNameOverload
        // );
    }, [primaryColor, inputClassName]);
    const handleInputChange = useCallback((e) => {
        const inputValue = e.target.value;
        const start = `${inputValue.slice(0, 4)}-${inputValue.slice(5, 7)}-${inputValue.slice(8, 10)}`;
        const end = `${inputValue.slice(13, 17)}-${inputValue.slice(18, 20)}-${inputValue.slice(21, inputValue.length)}`;
        const input = inputRef?.current;
        if (start.length === 10 &&
            end.length === 10 &&
            dateIsValid(new Date(start)) &&
            dateIsValid(new Date(end)) &&
            dayjs(start).isBefore(end)) {
            changeDatepickerValue({
                startDate: start,
                endDate: end
            });
            changeDayHover(dayjs(end).add(-1, "day").format("YYYY-MM-DD"));
            hideDatepicker();
            if (input) {
                input.blur();
            }
        }
        changeInputText(e.target.value);
    }, [changeDatepickerValue, changeDayHover, changeInputText, hideDatepicker]);
    // UseEffects && UseLayoutEffect
    useEffect(() => {
        const button = buttonRef?.current;
        function focusInput(e) {
            e.stopPropagation();
            if (inputRef?.current) {
                inputRef.current.focus();
                if (inputText) {
                    changeInputText("");
                    if (dayHover) {
                        changeDayHover(null);
                    }
                    if (period.start && period.end) {
                        changeDatepickerValue({
                            startDate: null,
                            endDate: null
                        });
                    }
                }
            }
        }
        if (button) {
            button.addEventListener("click", focusInput);
        }
        return () => {
            if (button) {
                button.removeEventListener("click", focusInput);
            }
        };
    }, [
        changeDatepickerValue,
        changeDayHover,
        changeInputText,
        dayHover,
        inputText,
        period.end,
        period.start
    ]);
    useEffect(() => {
        const div = calendarContainer?.current;
        const input = inputRef.current;
        const arrow = arrowContainer?.current;
        function showCalendarContainer() {
            if (arrow && div && div.classList.contains("hidden")) {
                div.classList.remove("hidden");
                div.classList.add("block");
                // window.innerWidth === 767
                if (window.innerWidth > 767 &&
                    window.screen.height - 100 < div.getBoundingClientRect().bottom) {
                    div.classList.add("bottom-full");
                    div.classList.add("mb-2.5");
                    div.classList.remove("mt-2.5");
                    arrow.classList.add("-bottom-2");
                    arrow.classList.add("border-r");
                    arrow.classList.add("border-b");
                    arrow.classList.remove("border-l");
                    arrow.classList.remove("border-t");
                }
                setTimeout(() => {
                    div.classList.remove("translate-y-4");
                    div.classList.remove("opacity-0");
                    div.classList.add("translate-y-0");
                    div.classList.add("opacity-1");
                }, 1);
            }
        }
        if (div && input) {
            input.addEventListener("focus", showCalendarContainer);
        }
        return () => {
            if (input) {
                input.removeEventListener("focus", showCalendarContainer);
            }
        };
    }, [calendarContainer, arrowContainer]);
    return (React.createElement(React.Fragment, null,
        React.createElement("input", { ref: inputRef, type: "text", className: getClassName(), disabled: disabled, placeholder: placeholder
                ? placeholder
                : `YYYY-MM-DD${asSingle ? "" : ` ${separator} YYYY-MM-DD`}`, value: inputText, onChange: handleInputChange }),
        React.createElement("button", { type: "button", ref: buttonRef, disabled: disabled, className: "absolute right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed" }, inputText ? React.createElement(CloseIcon, { className: "h-5 w-5" }) : React.createElement(DateIcon, { className: "h-5 w-5" }))));
};

// eslint-disable-next-line react/display-name
const ItemTemplate = React.memo((props) => {
    const { primaryColor, period, changePeriod, changeInputText, updateFirstDate, dayHover, changeDayHover, hideDatepicker, changeDatepickerValue } = useContext(DatepickerContext);
    // Functions
    const getClassName = useCallback(() => {
        const textColor = TEXT_COLOR["600"][primaryColor];
        const textColorHover = TEXT_COLOR.hover[primaryColor];
        return `whitespace-nowrap w-1/2 md:w-1/3 lg:w-auto transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded cursor-pointer ${textColor} ${textColorHover}`;
    }, [primaryColor]);
    const chosePeriod = useCallback((item) => {
        if (dayHover) {
            changeDayHover(null);
        }
        if (period.start || period.end) {
            changePeriod({
                start: null,
                end: null
            });
        }
        changeInputText(`${item.start} ~ ${item.end}`);
        changePeriod(item);
        changeDatepickerValue({
            startDate: item.start,
            endDate: item.end
        });
        updateFirstDate(dayjs(item.start));
        hideDatepicker();
    }, [
        changeDatepickerValue,
        changeDayHover,
        changeInputText,
        changePeriod,
        dayHover,
        hideDatepicker,
        period.end,
        period.start,
        updateFirstDate
    ]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const children = props?.children;
    return (React.createElement("li", { className: getClassName(), onClick: () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            chosePeriod(props?.item.period);
        } }, children));
});
const Shortcuts = () => {
    // Contexts
    const { configs } = useContext(DatepickerContext);
    const callPastFunction = (data, numberValue) => {
        return typeof data === "function" ? data(numberValue) : null;
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const printItemText = item => {
        return "text" in item ? item.text : "";
    };
    return (React.createElement("div", { className: "md:border-b mb-3 lg:mb-0 lg:border-r lg:border-b-0 border-gray-300 dark:border-gray-700 pr-1" },
        React.createElement("ul", { className: "w-full tracking-wide flex flex-wrap lg:flex-col pb-1 lg:pb-0" }, Object.entries(DEFAULT_SHORTCUTS).map(([key, item], index) => key === "past" ? ((Array.isArray(item) ? item : []).map((item, index) => (React.createElement(ItemTemplate, { key: index, item: item },
            React.createElement(React.Fragment, null, configs && configs.shortcuts && key in configs.shortcuts
                ? callPastFunction(configs.shortcuts[key], item.daysNumber)
                : item.text))))) : (React.createElement(ItemTemplate, { key: index, item: item },
            React.createElement(React.Fragment, null, configs && configs.shortcuts && key in configs.shortcuts
                ? configs.shortcuts[key]
                : printItemText(item))))))));
};

function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}

const Datepicker = ({ primaryColor = "blue", value = null, onChange, useRange = true, showFooter = false, showShortcuts = false, configs = null, asSingle = false, placeholder = null, separator = "~", startFrom = null, i18n = "en", disabled = false, inputClassName = null, containerClassName = null }) => {
    // Ref
    const containerRef = useRef(null);
    const calendarContainerRef = useRef(null);
    const arrowRef = useRef(null);
    // State
    const [firstDate, setFirstDate] = useState(startFrom && dayjs(startFrom).isValid() ? dayjs(startFrom) : dayjs());
    const [period, setPeriod] = useState({
        start: null,
        end: null
    });
    const [secondDate, setSecondDate] = useState(nextMonth(firstDate));
    const [dayHover, setDayHover] = useState(null);
    const [inputText, setInputText] = useState("");
    // Custom Hooks use
    useOnClickOutside(containerRef, () => {
        const container = containerRef.current;
        if (container) {
            hideDatepicker();
        }
    });
    // Functions
    const hideDatepicker = useCallback(() => {
        const div = calendarContainerRef.current;
        const arrow = arrowRef.current;
        if (arrow && div && div.classList.contains("block")) {
            div.classList.remove("block");
            div.classList.remove("translate-y-0");
            div.classList.remove("opacity-1");
            div.classList.add("translate-y-4");
            div.classList.add("opacity-0");
            setTimeout(() => {
                div.classList.remove("bottom-full");
                div.classList.add("hidden");
                div.classList.add("mb-2.5");
                div.classList.add("mt-2.5");
                arrow.classList.remove("-bottom-2");
                arrow.classList.remove("border-r");
                arrow.classList.remove("border-b");
                arrow.classList.add("border-l");
                arrow.classList.add("border-t");
            }, 300);
        }
    }, []);
    const firstGotoDate = useCallback((date) => {
        const newDate = dayjs(formatDate(date));
        const reformatDate = dayjs(formatDate(secondDate));
        if (newDate.isSame(reformatDate) || newDate.isAfter(reformatDate)) {
            setSecondDate(nextMonth(date));
        }
        setFirstDate(date);
    }, [secondDate]);
    const previousMonthFirst = useCallback(() => {
        setFirstDate(previousMonth(firstDate));
    }, [firstDate]);
    const nextMonthFirst = useCallback(() => {
        firstGotoDate(nextMonth(firstDate));
    }, [firstDate, firstGotoDate]);
    const secondGotoDate = useCallback((date) => {
        const newDate = dayjs(formatDate(date));
        const reformatDate = dayjs(formatDate(firstDate));
        if (newDate.isSame(reformatDate) || newDate.isBefore(reformatDate)) {
            setFirstDate(previousMonth(date));
        }
        setSecondDate(date);
    }, [firstDate]);
    const previousMonthSecond = useCallback(() => {
        secondGotoDate(previousMonth(secondDate));
    }, [secondDate, secondGotoDate]);
    const nextMonthSecond = useCallback(() => {
        setSecondDate(nextMonth(secondDate));
    }, [secondDate]);
    const changeFirstMonth = useCallback((month) => {
        firstGotoDate(dayjs(`${firstDate.year()}-${month < 10 ? "0" : ""}${month}-01`));
    }, [firstDate, firstGotoDate]);
    const changeSecondMonth = useCallback((month) => {
        secondGotoDate(dayjs(`${secondDate.year()}-${month < 10 ? "0" : ""}${month}-01`));
    }, [secondDate, secondGotoDate]);
    const changeFirstYear = useCallback((year) => {
        firstGotoDate(dayjs(`${year}-${firstDate.month() + 1}-01`));
    }, [firstDate, firstGotoDate]);
    const changeSecondYear = useCallback((year) => {
        secondGotoDate(dayjs(`${year}-${secondDate.month() + 1}-01`));
    }, [secondDate, secondGotoDate]);
    // UseEffects & UseLayoutEffect
    useEffect(() => {
        const container = containerRef.current;
        const calendarContainer = calendarContainerRef.current;
        const arrow = arrowRef.current;
        if (container && calendarContainer && arrow) {
            const detail = container.getBoundingClientRect();
            const screenCenter = window.innerWidth / 2;
            const containerCenter = (detail.right - detail.x) / 2 + detail.x;
            if (containerCenter > screenCenter) {
                arrow.classList.add("right-0");
                arrow.classList.add("mr-3.5");
                calendarContainer.classList.add("right-0");
            }
        }
    }, []);
    useEffect(() => {
        if (value && value.startDate && value.endDate) {
            const startDate = dayjs(value.startDate);
            const endDate = dayjs(value.endDate);
            const validDate = startDate.isValid() && endDate.isValid();
            const condition = validDate && (startDate.isSame(endDate) || startDate.isBefore(endDate));
            if (condition) {
                setPeriod({
                    start: formatDate(startDate),
                    end: formatDate(endDate)
                });
                setInputText(`${formatDate(startDate)}${asSingle ? "" : ` ~ ${formatDate(endDate)}`}`);
            }
        }
        if (value && value.startDate === null && value.endDate === null) {
            setPeriod({
                start: null,
                end: null
            });
        }
    }, [asSingle, value]);
    // Variable
    const colorPrimary = useMemo(() => {
        if (COLORS.includes(primaryColor)) {
            return primaryColor;
        }
        return DEFAULT_COLOR;
    }, [primaryColor]);
    const contextValues = useMemo(() => {
        return {
            asSingle,
            primaryColor: colorPrimary,
            configs,
            calendarContainer: calendarContainerRef,
            arrowContainer: arrowRef,
            hideDatepicker,
            period,
            changePeriod: (newPeriod) => setPeriod(newPeriod),
            dayHover,
            changeDayHover: (newDay) => setDayHover(newDay),
            inputText,
            changeInputText: (newText) => setInputText(newText),
            updateFirstDate: (newDate) => firstGotoDate(newDate),
            changeDatepickerValue: onChange,
            showFooter,
            placeholder,
            separator,
            i18n,
            value,
            disabled,
            inputClassName,
            containerClassName
        };
    }, [
        asSingle,
        colorPrimary,
        configs,
        dayHover,
        firstGotoDate,
        hideDatepicker,
        i18n,
        inputText,
        onChange,
        period,
        placeholder,
        separator,
        showFooter,
        value,
        disabled,
        inputClassName,
        containerClassName
    ]);
    return (React.createElement(DatepickerContext.Provider, { value: contextValues },
        React.createElement("div", { className: `relative w-full text-gray-700 ${containerClassName}`, ref: containerRef },
            React.createElement(Input, null),
            React.createElement("div", { className: "transition-all ease-out duration-300 absolute z-10 mt-[1px] text-sm lg:text-xs 2xl:text-sm translate-y-4 opacity-0 hidden", ref: calendarContainerRef },
                React.createElement(Arrow, { ref: arrowRef }),
                React.createElement("div", { className: "mt-2.5 shadow-sm border border-gray-300 px-1 py-0.5 bg-white dark:bg-slate-800 dark:text-white dark:border-slate-600 rounded-lg" },
                    React.createElement("div", { className: "flex flex-col lg:flex-row py-2" },
                        showShortcuts && React.createElement(Shortcuts, null),
                        React.createElement("div", { className: `flex items-stretch flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-1.5 ${showShortcuts ? "md:pl-2" : "md:pl-1"} pr-2 lg:pr-1` },
                            React.createElement(Calendar, { date: firstDate, onClickPrevious: previousMonthFirst, onClickNext: nextMonthFirst, changeMonth: changeFirstMonth, changeYear: changeFirstYear }),
                            useRange && (React.createElement(React.Fragment, null,
                                React.createElement("div", { className: "flex items-center" },
                                    React.createElement(VerticalDash, null)),
                                React.createElement(Calendar, { date: secondDate, onClickPrevious: previousMonthSecond, onClickNext: nextMonthSecond, changeMonth: changeSecondMonth, changeYear: changeSecondYear }))))),
                    showFooter && React.createElement(Footer, null))))));
};

export { Datepicker as default };
//# sourceMappingURL=index.esm.js.map
