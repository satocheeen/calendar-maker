import { ref, watch } from "vue";

/**
 * LocalStorageと同期する値を管理するフック
 * @param props 
 * @returns 
 */
type LocalStorageHookProps<T> = {
    key: string;    // LocalStorageに格納するキー
    default: T;     // 初期値
}

export default function useLocalStorage<T>(props: LocalStorageHookProps<T>) {
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
