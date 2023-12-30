import { type InjectionKey } from "vue";
import useLocalStorage from "./useLocalStorage";
import { useMediaQuery } from '@vueuse/core'

export type YearMonth = {
    year: number;
    month: number;
}
export default function useOperation() {
    const isSp = useMediaQuery('(max-width: 500px)')

    // 表示中の年月
    const yearMonth = useLocalStorage<YearMonth>({
        key: 'yearMonth',
        default: {
            year: new Date().getFullYear(),
            month: 1,
        }
    });

    return {
        yearMonth,
        isSp: isSp.value,
    }

}

export type OperationStore = ReturnType<typeof useOperation>;
export const OperationStoreKey: InjectionKey<OperationStore> = Symbol('OperationStore');
