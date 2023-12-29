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

/**
 * Yearly Calendar定義
 */
export type YearlyCalendarStyleDefine = {
    fonts: {
        year?: FontStyle;
        month?: FontStyle;
        day?: DayFontStyle;
        coverTitle?: FontStyle;
    },
    divider: {
        size: number;
        color?: string;
        width: number;
        style?: string;
    }
}

type FontStyle = {
    fontSize?: number;   // 単位rem
    fontFamily?: string;
    color?: string;
}
type DayFontStyle = FontStyle & {
    holidayColor?: string;
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

