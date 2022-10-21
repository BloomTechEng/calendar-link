"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const index_1 = require("./index");
const utils_1 = require("./utils");
describe("Calendar Links", () => {
    describe("Google", () => {
        test("generate a google link", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                duration: [2, "hour"],
            };
            const link = (0, index_1.google)(event);
            const sTime = (0, dayjs_1.default)(event.start).utc().format(utils_1.TimeFormats.dateTimeUTC);
            const eTime = (0, dayjs_1.default)(event.start).add(2, "hour").utc().format(utils_1.TimeFormats.dateTimeUTC);
            const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
            expect(link).toBe(`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${expectedDates}&text=Birthday%20party`);
        });
        test("generate a google link with time & timezone", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29T12:00:00.000+01:00",
                duration: [2, "hour"],
            };
            const link = (0, index_1.google)(event);
            const sTime = (0, dayjs_1.default)(event.start).utc().format(utils_1.TimeFormats.dateTimeUTC);
            const eTime = (0, dayjs_1.default)(event.start).add(2, "hour").utc().format(utils_1.TimeFormats.dateTimeUTC);
            const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
            expect(link).toBe(`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${expectedDates}&text=Birthday%20party`);
        });
        test("generate an all day google link", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                allDay: true,
            };
            const link = (0, index_1.google)(event);
            const sTime = (0, dayjs_1.default)(event.start).utc().format(utils_1.TimeFormats.allDay);
            const eTime = (0, dayjs_1.default)(event.start).add(1, "day").utc().format(utils_1.TimeFormats.allDay);
            const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
            expect(link).toBe(`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${expectedDates}&text=Birthday%20party`);
        });
        test("generate a multi day google link", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                end: "2020-01-12",
                allDay: true,
            };
            const link = (0, index_1.google)(event);
            const sTime = (0, dayjs_1.default)(event.start).utc().format(utils_1.TimeFormats.allDay);
            const eTime = (0, dayjs_1.default)(event.end).utc().format(utils_1.TimeFormats.allDay);
            const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
            expect(link).toBe(`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${expectedDates}&text=Birthday%20party`);
        });
        test("generate a recurring google link", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                duration: [2, "hour"],
                rRule: "FREQ=YEARLY;INTERVAL=1",
            };
            const link = (0, index_1.google)(event);
            const sTime = (0, dayjs_1.default)(event.start).utc().format(utils_1.TimeFormats.dateTimeUTC);
            const eTime = (0, dayjs_1.default)(event.start).add(2, "hour").utc().format(utils_1.TimeFormats.dateTimeUTC);
            const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
            expect(link).toBe(`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${expectedDates}&recur=RRULE%3AFREQ%3DYEARLY%3BINTERVAL%3D1&text=Birthday%20party`);
        });
        test("generate a google link with guests", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                duration: [2, "hour"],
                guests: ["hello@example.com", "another@example.com"],
            };
            const link = (0, index_1.google)(event);
            const sTime = (0, dayjs_1.default)(event.start).utc().format(utils_1.TimeFormats.dateTimeUTC);
            const eTime = (0, dayjs_1.default)(event.start).add(2, "hour").utc().format(utils_1.TimeFormats.dateTimeUTC);
            const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
            const expectedGuests = encodeURIComponent(event.guests ? event.guests.join() : "");
            expect(link).toBe(`https://calendar.google.com/calendar/render?action=TEMPLATE&add=${expectedGuests}&dates=${expectedDates}&text=Birthday%20party`);
        });
    });
    describe("Yahoo", () => {
        test("generate a yahoo link", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                duration: [2, "hour"],
            };
            const link = (0, index_1.yahoo)(event);
            const sTime = (0, dayjs_1.default)(event.start).utc().format(utils_1.TimeFormats.dateTimeUTC);
            const eTime = (0, dayjs_1.default)(event.start).add(2, "hour").utc().format(utils_1.TimeFormats.dateTimeUTC);
            expect(link).toBe(`https://calendar.yahoo.com/?dur=false&et=${eTime}&st=${sTime}&title=Birthday%20party&v=60`);
        });
        test("generate an all day yahoo link", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                allDay: true,
            };
            const link = (0, index_1.yahoo)(event);
            const sTime = (0, dayjs_1.default)(event.start).utc().format(utils_1.TimeFormats.allDay);
            const eTime = (0, dayjs_1.default)(event.start).add(1, "day").utc().format(utils_1.TimeFormats.allDay);
            expect(link).toBe(`https://calendar.yahoo.com/?dur=allday&et=${eTime}&st=${sTime}&title=Birthday%20party&v=60`);
        });
    });
    describe("Outlook", () => {
        test("generate a outlook link", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                duration: [2, "hour"],
            };
            const link = (0, index_1.outlook)(event);
            expect(link).toBe(`https://outlook.live.com/calendar/0/deeplink/compose?allday=false&enddt=2019-12-29T02%3A00%3A00&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2019-12-29T00%3A00%3A00&subject=Birthday%20party`);
        });
        test("generate an all day outlook link", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                allDay: true,
            };
            const link = (0, index_1.outlook)(event);
            expect(link).toBe(`https://outlook.live.com/calendar/0/deeplink/compose?allday=true&enddt=2019-12-30T00%3A00%3A00&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2019-12-29T00%3A00%3A00&subject=Birthday%20party`);
        });
    });
    describe("Office365", () => {
        test("generate a office365 link", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                duration: [2, "hour"],
            };
            const link = (0, index_1.office365)(event);
            expect(link).toBe(`https://outlook.office.com/calendar/0/deeplink/compose?allday=false&enddt=2019-12-29T02%3A00%3A00&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2019-12-29T00%3A00%3A00&subject=Birthday%20party`);
        });
        test("generate an all day office365 link", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                allDay: true,
            };
            const link = (0, index_1.office365)(event);
            expect(link).toBe(`https://outlook.office.com/calendar/0/deeplink/compose?allday=true&enddt=2019-12-30T00%3A00%3A00&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2019-12-29T00%3A00%3A00&subject=Birthday%20party`);
        });
    });
    describe("ICS", () => {
        test("should generate an all day ics link", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                allDay: true,
            };
            const sTime = (0, dayjs_1.default)(event.start).utc().format(utils_1.TimeFormats.allDay);
            const eTime = (0, dayjs_1.default)(event.start).add(1, "day").utc().format(utils_1.TimeFormats.allDay);
            const link = (0, index_1.ics)(event);
            expect(link).toBe(`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${sTime}%0ADTEND:${eTime}%0ASUMMARY:Birthday%20party%0AEND:VEVENT%0AEND:VCALENDAR%0A`);
        });
        test("should generate an ics link", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                duration: [2, "day"],
            };
            const sTime = (0, dayjs_1.default)(event.start).utc().format(utils_1.TimeFormats.dateTimeUTC);
            const eTime = (0, dayjs_1.default)(event.start).add(2, "day").utc().format(utils_1.TimeFormats.dateTimeUTC);
            const link = (0, index_1.ics)(event);
            expect(link).toBe(`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${sTime}%0ADTEND:${eTime}%0ASUMMARY:Birthday%20party%0AEND:VEVENT%0AEND:VCALENDAR%0A`);
        });
        test("should generate an ics link with end date", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-23",
                end: "2019-12-29",
            };
            const sTime = (0, dayjs_1.default)(event.start).utc().format(utils_1.TimeFormats.dateTimeUTC);
            const eTime = (0, dayjs_1.default)(event.end).utc().format(utils_1.TimeFormats.dateTimeUTC);
            const link = (0, index_1.ics)(event);
            expect(link).toBe(`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${sTime}%0ADTEND:${eTime}%0ASUMMARY:Birthday%20party%0AEND:VEVENT%0AEND:VCALENDAR%0A`);
        });
        test("should generate an ics link with escaped characters", () => {
            const event = {
                title: "!#$%&'()*+,/:;=?@[] — Birthday party",
                description: "!#$%&'()*+,/:;=?@[] — My birthday!",
                location: "!#$%&'()*+,/:;=?@[] — My birthday!",
                start: "2019-12-23",
                end: "2019-12-29",
            };
            const sTime = (0, dayjs_1.default)(event.start).utc().format(utils_1.TimeFormats.dateTimeUTC);
            const eTime = (0, dayjs_1.default)(event.end).utc().format(utils_1.TimeFormats.dateTimeUTC);
            const link = (0, index_1.ics)(event);
            expect(link).toBe(`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${sTime}%0ADTEND:${eTime}%0ASUMMARY:!%23%24%25%26'()*%2B%2C%2F%3A%3B%3D%3F%40%5B%5D%20%E2%80%94%20Birthday%20party%0ADESCRIPTION:!%23%24%25%26'()*%2B%2C%2F%3A%3B%3D%3F%40%5B%5D%20%E2%80%94%20My%20birthday!%0ALOCATION:!%23%24%25%26'()*%2B%2C%2F%3A%3B%3D%3F%40%5B%5D%20%E2%80%94%20My%20birthday!%0AEND:VEVENT%0AEND:VCALENDAR%0A`);
        });
        test("should generate an all day ics link with a custom URL", () => {
            const url = "https://example.com/birthday";
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                allDay: true,
                url,
            };
            const sTime = (0, dayjs_1.default)(event.start).utc().format(utils_1.TimeFormats.allDay);
            const eTime = (0, dayjs_1.default)(event.start).add(1, "day").utc().format(utils_1.TimeFormats.allDay);
            const link = (0, index_1.ics)(event);
            expect(link).toBe(`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:${encodeURIComponent(url)}%0ADTSTART:${sTime}%0ADTEND:${eTime}%0ASUMMARY:Birthday%20party%0AEND:VEVENT%0AEND:VCALENDAR%0A`);
        });
        test("allDay should take precedence over duration", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                allDay: true,
                duration: [2, "day"],
            };
            const sTime = (0, dayjs_1.default)(event.start).utc().format(utils_1.TimeFormats.allDay);
            const eTime = (0, dayjs_1.default)(event.start).add(1, "day").utc().format(utils_1.TimeFormats.allDay);
            const link = (0, index_1.ics)(event);
            expect(link).toBe(`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${sTime}%0ADTEND:${eTime}%0ASUMMARY:Birthday%20party%0AEND:VEVENT%0AEND:VCALENDAR%0A`);
        });
        test("should generate an ics link with an organizer", () => {
            const event = {
                title: "Birthday party",
                start: "2019-12-29",
                duration: [2, "day"],
                organizer: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                },
            };
            const sTime = (0, dayjs_1.default)(event.start).utc().format(utils_1.TimeFormats.dateTimeUTC);
            const eTime = (0, dayjs_1.default)(event.start).add(2, "day").utc().format(utils_1.TimeFormats.dateTimeUTC);
            const link = (0, index_1.ics)(event);
            expect(link).toBe(`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${sTime}%0ADTEND:${eTime}%0ASUMMARY:Birthday%20party%0AORGANIZER;CN%3DJohn%20Doe%3AMAILTO%3Ajohn.doe%40example.com%0AEND:VEVENT%0AEND:VCALENDAR%0A`);
        });
    });
});
//# sourceMappingURL=index.spec.js.map