import React from "react";

export function useLocalStorageState<T>(
    key: string,
    defaultValue: T | (() => T),
    {
        serialize = JSON.stringify,
        deserialize = JSON.parse
    }: {
        serialize?: (value: T) => string;
        deserialize?: (value: string) => T;
    } = {}
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const storage: Storage = window.localStorage;
    const [state, setState] = React.useState<T>(() => {
        if (storage) {
            const valueInLocalStorage = storage.getItem(key);
            if (valueInLocalStorage) {
                try {
                    return deserialize(valueInLocalStorage);
                } catch (_error) {
                    storage.removeItem(key);
                }
            }
        }
        return typeof defaultValue === "function" ? (defaultValue as () => T)() : defaultValue;
    });

    const prevKeyRef = React.useRef(key);

    React.useEffect(() => {
        const prevKey = prevKeyRef.current;
        if (prevKey !== key) {
            storage.removeItem(prevKey);
        }
        prevKeyRef.current = key;
        storage.setItem(key, serialize(state));
    }, [key, state, serialize, storage]);

    return [state, setState];
}
