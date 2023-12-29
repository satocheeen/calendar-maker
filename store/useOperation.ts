import { type InjectionKey } from "vue";
import useLocalStorage from "./useLocalStorage";

export type YearMonth = {
    year: number;
    month: number;
}
export default function useOperation() {
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
    }

}

type OperationStore = ReturnType<typeof useOperation>;
export const OperationStoreKey: InjectionKey<OperationStore> = Symbol('OperationStore');
