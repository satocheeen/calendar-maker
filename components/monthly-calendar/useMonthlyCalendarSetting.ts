import { StyleStoreKey } from "~/store/useStyle";

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

    return {
        year,
        month,
        styleDefine,
    }
}
type MonthlyCalendarSettingStore = ReturnType<typeof useMonthlyCalendarSetting>;
export const MonthlyCalendarSettingStoreKey: InjectionKey<MonthlyCalendarSettingStore> = Symbol('MonthlyCalendarSettingStore');
