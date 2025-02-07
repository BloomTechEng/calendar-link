"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ics = exports.yahoo = exports.office365 = exports.outlook = exports.google = exports.eventify = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const query_string_1 = require("query-string");
const utils_1 = require("./utils");
dayjs_1.default.extend(utc_1.default);
function formatTimes({ startTime, endTime }, dateTimeFormat) {
    const format = utils_1.TimeFormats[dateTimeFormat];
    return { start: startTime.format(format), end: endTime.format(format) };
}
const eventify = (event, toUtc = true) => {
    const { start, end, duration, ...rest } = event;
    const startTime = toUtc ? (0, dayjs_1.default)(start).utc() : (0, dayjs_1.default)(start);
    const endTime = end
        ? toUtc
            ? (0, dayjs_1.default)(end).utc()
            : (0, dayjs_1.default)(end)
        : (() => {
            if (event.allDay) {
                return startTime.add(1, "day");
            }
            if (duration && duration.length == 2) {
                const value = Number(duration[0]);
                const unit = duration[1];
                return startTime.add(value, unit);
            }
            return toUtc ? (0, dayjs_1.default)().utc() : (0, dayjs_1.default)();
        })();
    return {
        ...rest,
        startTime: startTime,
        endTime: endTime,
    };
};
exports.eventify = eventify;
const google = (calendarEvent) => {
    const event = (0, exports.eventify)(calendarEvent);
    const { start, end } = formatTimes(event, event.allDay ? "allDay" : "dateTimeUTC");
    const details = {
        action: "TEMPLATE",
        text: event.title,
        details: event.description,
        location: event.location,
        trp: event.busy,
        dates: start + "/" + end,
        recur: event.rRule ? "RRULE:" + event.rRule : undefined,
    };
    if (event.guests && event.guests.length) {
        details.add = event.guests.join();
    }
    return `https://calendar.google.com/calendar/render?${(0, query_string_1.stringify)(details)}`;
};
exports.google = google;
const outlook = (calendarEvent) => {
    const event = (0, exports.eventify)(calendarEvent, false);
    const { start, end } = formatTimes(event, "dateTimeLocal");
    const details = {
        path: "/calendar/action/compose",
        rru: "addevent",
        startdt: start,
        enddt: end,
        subject: event.title,
        body: event.description,
        location: event.location,
        allday: event.allDay || false,
    };
    return `https://outlook.live.com/calendar/0/deeplink/compose?${(0, query_string_1.stringify)(details)}`;
};
exports.outlook = outlook;
const office365 = (calendarEvent) => {
    const event = (0, exports.eventify)(calendarEvent, false);
    const { start, end } = formatTimes(event, "dateTimeLocal");
    const details = {
        path: "/calendar/action/compose",
        rru: "addevent",
        startdt: start,
        enddt: end,
        subject: event.title,
        body: event.description,
        location: event.location,
        allday: event.allDay || false,
    };
    return `https://outlook.office.com/calendar/0/deeplink/compose?${(0, query_string_1.stringify)(details)}`;
};
exports.office365 = office365;
const yahoo = (calendarEvent) => {
    const event = (0, exports.eventify)(calendarEvent);
    const { start, end } = formatTimes(event, event.allDay ? "allDay" : "dateTimeUTC");
    const details = {
        v: 60,
        title: event.title,
        st: start,
        et: end,
        desc: event.description,
        in_loc: event.location,
        dur: event.allDay ? "allday" : false,
    };
    return `https://calendar.yahoo.com/?${(0, query_string_1.stringify)(details)}`;
};
exports.yahoo = yahoo;
const ics = (calendarEvent) => {
    const event = (0, exports.eventify)(calendarEvent);
    const formattedDescription = (event.description || "")
        .replace(/,/gm, ",")
        .replace(/;/gm, ";")
        .replace(/\r\n/gm, "\n")
        .replace(/\n/gm, "\\n")
        .replace(/(\\n)[\s\t]+/gm, "\\n");
    const formattedLocation = (event.location || "")
        .replace(/,/gm, ",")
        .replace(/;/gm, ";")
        .replace(/\r\n/gm, "\n")
        .replace(/\n/gm, "\\n")
        .replace(/(\\n)[\s\t]+/gm, "\\n");
    const { start, end } = formatTimes(event, event.allDay ? "allDay" : "dateTimeUTC");
    const calendarChunks = [
        {
            key: "BEGIN",
            value: "VCALENDAR",
        },
        {
            key: "VERSION",
            value: "2.0",
        },
        {
            key: "BEGIN",
            value: "VEVENT",
        },
        {
            key: "URL",
            value: event.url,
        },
        {
            key: "DTSTART",
            value: start,
        },
        {
            key: "DTEND",
            value: end,
        },
        {
            key: "RRULE",
            value: event.rRule,
        },
        {
            key: "SUMMARY",
            value: event.title,
        },
        {
            key: "DESCRIPTION",
            value: formattedDescription,
        },
        {
            key: "LOCATION",
            value: formattedLocation,
        },
        {
            key: "ORGANIZER",
            value: event.organizer,
        },
        {
            key: "END",
            value: "VEVENT",
        },
        {
            key: "END",
            value: "VCALENDAR",
        },
    ];
    let calendarUrl = "";
    calendarChunks.forEach((chunk) => {
        if (chunk.value) {
            if (chunk.key == "ORGANIZER") {
                const value = chunk.value;
                calendarUrl += `${chunk.key};${encodeURIComponent(`CN=${value.name}:MAILTO:${value.email}\n`)}`;
            }
            else {
                calendarUrl += `${chunk.key}:${encodeURIComponent(`${chunk.value}\n`)}`;
            }
        }
    });
    return `data:text/calendar;charset=utf8,${calendarUrl}`;
};
exports.ics = ics;
//# sourceMappingURL=index.js.map