import { type InjectionKey, ref, watch } from "vue";
import type { FontDefine, MonthlyCalendarCommonDefine, MonthlyCalendarDefine, MonthlyColorDefine, YearlyCalendarStyleDefine } from "./types";
import { defaultYearlyDefine, defaultMonthlyCalendarCommonDefine, defaultPresets } from "./defaults";

export default function useStyle() {
    // 表示中の年月（設定ファイルの入出力対象外）
    const yearMonth = useLocalStorage<{year: number; month: number}>({
        key: 'yearMonth',
        default: {
            year: new Date().getFullYear(),
            month: 1,
        }
    });

    const monthlyDefine = useLocalStorage<{[yearMonth: string]: MonthlyCalendarDefine}>({
        key: 'monthlyDefine',
        default: {}
    })

    const monthlyCommonDefine = useLocalStorage<MonthlyCalendarCommonDefine>({
        key: 'monthlyCommonDefine',
        default: defaultMonthlyCalendarCommonDefine,
    });

    const presets = useLocalStorage<MonthlyColorDefine[]>({
        key: 'presets',
        default: defaultPresets,
    });

    const yearlyDefine = useLocalStorage<YearlyCalendarStyleDefine>({
        key: 'yearlyDefine',
        default: defaultYearlyDefine,
    })

    const defaultPreset = computed(() => {
        // TODO: ユーザがデフォルトを指定できるようにする
        return defaultPresets[0];
    })

    const setMonthlyCalendarSetting = (year: number, month: number, values: Partial<MonthlyCalendarDefine>) => {
        const yearMonth = year + '-' + month;
        monthlyDefine.value[yearMonth] = Object.assign({}, monthlyDefine.value[yearMonth], values);
    }

    const getCalendarStyleDefine = (year: number, month: number) => {
        const yearMonth = year + '-' + month;
        const savedColors = (monthlyDefine.value[yearMonth] ?? {}).colors ?? {};
        const colors = Object.assign(defaultPreset.value, savedColors);
        const define = Object.assign({}, monthlyDefine.value[yearMonth] ?? {}, { colors });
        return define;
    }

    const setMonthlyCalendarColor = (year: number, month: number, key: keyof MonthlyColorDefine, color: string) => {
        const yearMonth = year + '-' + month;
        const currentColors = (monthlyDefine.value[yearMonth] ?? {}).colors ?? {};
        const newColors = Object.assign(currentColors, { [key]: color });
        monthlyDefine.value[yearMonth] = Object.assign({}, monthlyDefine.value[yearMonth], {colors: newColors });
    }

    /**
     * 指定のカラーセットをプリセット登録する
     * @returns 
     */
    const addPreset = (colors: MonthlyColorDefine) => {
        presets.value.push(colors);
    }

    const removePreset = (index: number) => {
        presets.value = presets.value.filter((_, i) => i !== index);
    }

    const setPreset = (year: number, month: number, preset: MonthlyColorDefine) => {
        const yearMonth = year + '-' + month;
        monthlyDefine.value[yearMonth].colors = preset;
    }

    const updateFontFamily = (target: keyof FontDefine, fontFamily: string|undefined) => {
        monthlyCommonDefine.value.fonts[target] = Object.assign({}, monthlyCommonDefine.value.fonts[target], { fontFamily });
    }

    const updateFontSize = (target: keyof FontDefine, fontSize: number|undefined) => {
        monthlyCommonDefine.value.fonts[target] = Object.assign({}, monthlyCommonDefine.value.fonts[target], { fontSize });
    }

    /**
     * 定義をファイル出力する
     */
    const output = () => {
        const json = {
            monthlyDefine: monthlyDefine.value,
            presets: presets.value,
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
        yearMonth,
        setMonthlyCalendarSetting,
        getCalendarStyleDefine,
        setMonthlyCalendarColor,
        presets,
        addPreset,
        removePreset,
        setPreset,
        output,
        load,
        monthlyCommonDefine,
        updateFontFamily,
        updateFontSize,
        yearlyDefine,
    }
}
type StyleStore = ReturnType<typeof useStyle>;
export const StyleStoreKey: InjectionKey<StyleStore> = Symbol('StyleStore');


/**
 * LocalStorageと同期する値を管理するフック
 * @param props 
 * @returns 
 */
type LocalStorageHookProps<T> = {
    key: string;    // LocalStorageに格納するキー
    default: T;     // 初期値
}
function useLocalStorage<T>(props: LocalStorageHookProps<T>) {
    const value = ref<T>(props.default);

    if (process.client) {
        const valueStr = localStorage.getItem(props.key);
        value.value = valueStr ? JSON.parse(valueStr) : props.default;
    }
    watch(() => value.value, (val) => {
        if (process.client) {
            localStorage.setItem(props.key, JSON.stringify(val));
        }
    }, { deep: true, immediate: true });

    return value;
}