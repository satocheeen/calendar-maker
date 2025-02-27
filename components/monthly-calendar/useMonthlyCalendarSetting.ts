import dayjs from "dayjs";
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(weekday);

import { StyleStoreKey } from "~/store/useStyle";
import { getEventDaysOfMonth, type EventDayInfo } from "~/util/holiday_checker";

export type DayInfo = {
    day: Date;
    anotherMonth: boolean;
    event: EventDayInfo | undefined;
    isHoliday: boolean
}

/**
 * MonthlyCalendarの設定情報
 */
type Props = {
    year: number;
    month: number;
}
export default function useMonthlyCalendarSetting(props: Props) {
    const year = computed(() => props.year);
    const month = computed(() => props.month);

    const styleStore = inject(StyleStoreKey);
    const styleDefine = computed(() => {
        return styleStore?.getMonthlyCalendarStyleDefine(props.year, props.month);
    })

    const startDayjs = computed(() => {
        // 1日の曜日（0=日曜日）
        const d = dayjs(`${props.year}-${props.month}-01`);
        const weekday = d.weekday();

        // 月曜日開始
        const offsetDays = weekday === 0 ? 6 : weekday - 1;
        return d.add(-offsetDays, 'd');
    });

    const eventDays = computed(() => {
        const list = getEventDaysOfMonth(props.year, props.month-1);
        return list;
    })

    const dates = computed(() => {
        const list = [] as DayInfo[];
        for (let n = 0; n < 42; n++) {
            const day = startDayjs.value.add(n, 'd');
            const month = day.get('month');
            const anotherMonth = (month + 1) !== props.month;
            const event = eventDays.value.find(event => event.date.day === day.date())?.info;
            const isHoliday = function() {
                if (anotherMonth) return false;

                const weekday = day.toDate().getDay();
                if (weekday === 0 || weekday === 6) {
                    return true;
                }
                // 祝日判定
                return event?.isHoliday ?? false;
            }();
            list.push({
                day: day.toDate(),
                anotherMonth,
                event,
                isHoliday,
            });
        }
        return list;
    });

    return {
        year,
        month,
        styleDefine,
        dates,
    }
}
type MonthlyCalendarSettingStore = ReturnType<typeof useMonthlyCalendarSetting>;
export const MonthlyCalendarSettingStoreKey: InjectionKey<MonthlyCalendarSettingStore> = Symbol('MonthlyCalendarSettingStore');
