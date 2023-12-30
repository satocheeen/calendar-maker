export type Presets = {
    defaultIndex: number;
    presets: MonthlyColorDefine[];
}
export type MonthlyColorDefine = {
    imageBorderColor: string;

    weekdayTextColor: string;
    weekdayBackgroundColor: string;
    holidayTextColor: string;
    holidayBackgroundColor: string;
    anotherMonthsDayTextColor: string;
    eventNameTextColor: string;
    yearMonthTextColor: string;

    weekdayLabelTextColor: string;
    weekdayLabelBackgroundColor: string;
    borderColor: string;
}

/**
 * Monthly Calendarの定義（月ごと）
 */
export type MonthlyCalendarDefine = {
    colors?: MonthlyColorDefine;
    imagePath?: string;
    imageOffset?: {
        x: number;
        y: number;
    };
}

export type Orientation = 'portrait'|'landscape';
/**
 * Monthly Calendarの定義（共通）
 */
export type MonthlyCalendarCommonDefine = {
    fonts: FontDefine;
    orientation: Orientation;
}

type YearlyFontStyle = {
    fontFamily?: string;
    color: string;
    thisYearFontSize: number;
    lastNextYearsFontSize: number;
}

/**
 * Yearly Calendar定義
 */
export type YearlyCalendarStyleDefine = {
    fonts: {
        year: YearlyFontStyle;
        month: YearlyFontStyle;
        day: YearlyFontStyle & { holidayColor: string }
    },
    divider: {
        size: number;
        color: string;
        width: number;
        style: string;
    },
    cover: {
        font: FontStyle;
        title?: string;
    }
}

type FontStyle = {
    fontSize: number;   // 単位rem
    fontFamily?: string;
    color: string;
}

type MonthlyFontStyle = Omit<FontStyle, 'color'>;

export type FontDefine = {
    monthNum?: MonthlyFontStyle;
    monthCharacter?: MonthlyFontStyle;
    year?: MonthlyFontStyle;
    weekdayLabel?: MonthlyFontStyle;
    dateNum?: MonthlyFontStyle;
    eventName?: MonthlyFontStyle;
}

