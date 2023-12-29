import { type InjectionKey } from "vue";
import type { FontDefine, MonthlyCalendarCommonDefine, MonthlyCalendarDefine, MonthlyColorDefine, Orientation, Presets, YearlyCalendarStyleDefine } from "./types";
import { defaultYearlyDefine, defaultMonthlyCalendarCommonDefine, defaultPresets } from "./defaults";
import useLocalStorage from "./useLocalStorage";
import type { OperationStore, YearMonth } from "./useOperation";
import merge from 'deepmerge';
import deepmerge from "deepmerge";

type Props = {
    operation: OperationStore;
}
export default function useStyle(props: Props) {
    const monthlyDefine = useLocalStorage<{[yearMonth: string]: MonthlyCalendarDefine}>({
        key: 'monthlyDefine',
        default: {},
    })

    const userMonthlyCommonDefine = useLocalStorage<Partial<MonthlyCalendarCommonDefine>>({
        key: 'monthlyCommonDefine',
        default: {},
    });

    const presets = useLocalStorage<Presets>({
        key: 'presets',
        default: {
            defaultIndex: 0,
            presets: defaultPresets,
        },
    });

    const yearlyDefine = useLocalStorage<YearlyCalendarStyleDefine>({
        key: 'yearlyDefine',
        default: defaultYearlyDefine,
    })

    const defaultPreset = computed(() => {
        const defaultIndex = presets.value.defaultIndex;
        return defaultPresets[defaultIndex];
    })

    const yearMonthKey = computed(() => {
        return getYearMonthKeyStr(props.operation.yearMonth.value);
    })

    const setCurrentMonthlyCalendarSetting = (values: Partial<MonthlyCalendarDefine>) => {
        monthlyDefine.value[yearMonthKey.value] = Object.assign({}, monthlyDefine.value[yearMonthKey.value], values);
    }

    const currentMonthlyCalendarStyleDefine = computed(() => {
        const savedColors = (monthlyDefine.value[yearMonthKey.value] ?? {}).colors ?? {};
        const colors = Object.assign({}, defaultPreset.value, savedColors);
        const define = Object.assign({}, monthlyDefine.value[yearMonthKey.value] ?? {}, { colors });
        return define;
    })
    
    const setCurrentMonthlyCalendarColor = (key: keyof MonthlyColorDefine, color: string) => {
        const currentColors = (monthlyDefine.value[yearMonthKey.value] ?? {}).colors ?? {};
        const newColors = Object.assign(currentColors, { [key]: color });
        monthlyDefine.value[yearMonthKey.value] = Object.assign({}, monthlyDefine.value[yearMonthKey.value], {colors: newColors });
    }

    /**
     * 現在年月のカラーをデフォルト値に戻る
     * @param year 
     * @param month 
     */
    const reseCurrenttMonthlyCalendarColor = () => {
        if (monthlyDefine.value[yearMonthKey.value]) {
            monthlyDefine.value[yearMonthKey.value].colors = undefined;
        }
    }

    /**
     * 現在年月のカラーがデフォルト値かどうかを返す
     * @returns 
     */
    const isDefaultColorMonthlyCalendar = computed(() => {
        const savedColors = (monthlyDefine.value[yearMonthKey.value] ?? {}).colors;
        return savedColors === undefined;
    })

    /**
     * 指定のカラーセットをプリセット登録する
     * @returns 
     */
    const addPreset = (colors: MonthlyColorDefine) => {
        presets.value.presets.push(colors);
    }

    const removePreset = (index: number) => {
        presets.value.presets = presets.value.presets.filter((_, i) => i !== index);
    }

    const setPresetToCurrentMonthlyCalendar = (preset: MonthlyColorDefine) => {
        if (!monthlyDefine.value[yearMonthKey.value]) {
            monthlyDefine.value[yearMonthKey.value] = { colors: preset }
        } else {
            monthlyDefine.value[yearMonthKey.value].colors = preset;
        }
    }

    const monthlyCommonDefine = computed(() => {
        const result = deepmerge(defaultMonthlyCalendarCommonDefine, userMonthlyCommonDefine.value);
        return result;
    })

    const updateFontFamily = (target: keyof FontDefine, fontFamily: string|undefined) => {
        const newDef: Partial<MonthlyCalendarCommonDefine> =  { 
            fonts: {
                [target]: {
                    fontFamily,
                }
            }
        };
        userMonthlyCommonDefine.value  = deepmerge(userMonthlyCommonDefine.value, newDef);
    }

    const updateFontSize = (target: keyof FontDefine, fontSize: number|undefined) => {
        const newDef: Partial<MonthlyCalendarCommonDefine> =  { 
            fonts: {
                [target]: {
                    fontSize,
                }
            }
        };
        userMonthlyCommonDefine.value  = deepmerge(userMonthlyCommonDefine.value, newDef);
    }

    const updateOrientation= (orientation: Orientation) => {
        userMonthlyCommonDefine.value.orientation = orientation;
    }

    /**
     * 定義をファイル出力する
     */
    const output = () => {
        const json = {
            monthlyDefine: monthlyDefine.value,
            monthlyCommonDefine: userMonthlyCommonDefine.value,
            presets: presets.value,
            yearlyDefine: yearlyDefine.value,
        };
        const blob = new Blob([JSON.stringify(json)], {type:"application/json"});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'calendar-maker-setting.json';
        link.click();
    }

    const load = () => {
        const fileInput = document.createElement('input') as HTMLInputElement;
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'application/json');
        fileInput.addEventListener('change', () => {
            const files = fileInput.files;
            if (!files || files.length === 0) {
                console.warn('file not found');
                return;
            }
            const file = files.item(0);
            if (!file) {
                console.warn('file not found');
                return;
            }

            const reader = new FileReader();
            reader.readAsText(file);
    
            reader.onload = () => {
                const jsonStr = reader.result;
                if (typeof jsonStr !== 'string') {
                    console.warn('format error');
                    return;
                }
                const json = JSON.parse(jsonStr);
                if ('monthlyDefine' in json) {
                    monthlyDefine.value = json.monthlyDefine;
                }
                if ('presets' in json) {
                    presets.value = json.presets;
                }
                if ('monthlyCommonDefine' in json) {
                    monthlyCommonDefine.value = json.monthlyCommonDefine;
                }
                if ('yearlyDefine' in json) {
                    yearlyDefine.value = json.yearlyDefine;
                }
            }
    
        });
        fileInput.click();
        
}

    return {
        setCurrentMonthlyCalendarSetting,
        currentMonthlyCalendarStyleDefine,
        setCurrentMonthlyCalendarColor,
        presets,
        addPreset,
        removePreset,
        setPresetToCurrentMonthlyCalendar,
        output,
        load,
        monthlyCommonDefine,
        updateFontFamily,
        updateFontSize,
        yearlyDefine,
        reseCurrenttMonthlyCalendarColor,
        isDefaultColorMonthlyCalendar,
        updateOrientation,
    }
}
type StyleStore = ReturnType<typeof useStyle>;
export const StyleStoreKey: InjectionKey<StyleStore> = Symbol('StyleStore');

function getYearMonthKeyStr(yearMonth: YearMonth) {
    return yearMonth.year + '-' + yearMonth.month;
}