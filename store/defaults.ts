import type { MonthlyCalendarCommonDefine, MonthlyColorDefine, YearlyCalendarStyleDefine } from "./types";

export const defaultMonthlyCalendarCommonDefine: MonthlyCalendarCommonDefine = {
    fonts: {
        monthNum: {
            fontSize: 3.5,
        },
        monthCharacter: {
            fontSize: 2.5,
        },
        year: {
            fontSize: 1.4,
        },
        weekdayLabel: {
            fontSize: 1,
        },
        dateNum: {
            fontSize: 1,
        },
        eventName: {
            fontSize: 0.8,
        }
    },
    orientation:'portrait',
}

export const defaultYearlyDefine: YearlyCalendarStyleDefine = {
    fonts: {
        year: {
            fontSize: 2,
            color: '#808080',
        },
        month: {
            fontSize: 1,
            color: '#808080',
        },
        day:{
            fontSize: .8,
            color: '#808080',
            holidayColor: '#ac6c7b',
        },
        coverTitle: {
            fontSize: 2,
            color: '#808080',
        }
    },
    divider: {
        size: 30,
        width: 0.1,
        color: '#808080',
    }
}

export const defaultPresets: MonthlyColorDefine[] = [
    {
        weekdayTextColor: "#808080",
        weekdayBackgroundColor: "#ffffff",
        holidayBackgroundColor: "#d9d9d9",
        holidayTextColor: "#808080",
        weekdayLabelTextColor: "#808080",
        weekdayLabelBackgroundColor: "#ffffff",
        anotherMonthsDayTextColor: "#bfbfbf",
        eventNameTextColor: "#808080",
        borderColor: "#d9d9d9",
        yearMonthTextColor: "#808080",
        imageBorderColor: "#ffffff"
    },
    {
        weekdayTextColor: "#ac6c7b",
        weekdayBackgroundColor: "#ffffff",
        holidayBackgroundColor: "#ac6c7b",
        holidayTextColor: "#ffffff",
        weekdayLabelTextColor: "#ac6c7b",
        weekdayLabelBackgroundColor: "#ffffff",
        anotherMonthsDayTextColor: "#bfbfbf",
        eventNameTextColor: "#ac6c7b",
        borderColor: "#d9d9d9",
        yearMonthTextColor: "#ac6c7b",
        imageBorderColor: "#ffffff"
    },
    {
        imageBorderColor: "#ffffff",
        weekdayTextColor: "#7c5d1e",
        weekdayBackgroundColor: "#ffffff",
        holidayTextColor: "#ffffff",
        holidayBackgroundColor: "#9f835b",
        anotherMonthsDayTextColor: "#bfbfbf",
        eventNameTextColor: "#9a8f60",
        yearMonthTextColor: "#7c5d1e",
        weekdayLabelTextColor: "#7c5d1e",
        weekdayLabelBackgroundColor: "#ffffff",
        borderColor: "#d9d9d9"
    },
    {
        imageBorderColor: "#ffffff",
        weekdayTextColor: "#5a5874",
        weekdayBackgroundColor: "#ffffff",
        holidayTextColor: "#ffffff",
        holidayBackgroundColor: "#5a5874",
        anotherMonthsDayTextColor: "#bfbfbf",
        eventNameTextColor: "#5a5874",
        yearMonthTextColor: "#5a5874",
        weekdayLabelTextColor: "#5a5874",
        weekdayLabelBackgroundColor: "#ffffff",
        borderColor: "#d9d9d9"
    },
    {
        imageBorderColor: "#ffffff",
        weekdayTextColor: "#9f8991",
        weekdayBackgroundColor: "#ffffff",
        holidayTextColor: "#ffffff",
        holidayBackgroundColor: "#9f8991",
        anotherMonthsDayTextColor: "#bfbfbf",
        eventNameTextColor: "#9f8991",
        yearMonthTextColor: "#9f8991",
        weekdayLabelTextColor: "#9f8991",
        weekdayLabelBackgroundColor: "#ffffff",
        borderColor: "#d9d9d9"
    }
]