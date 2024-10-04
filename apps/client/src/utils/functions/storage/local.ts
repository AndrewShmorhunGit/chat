export function setLocalStorageItem(name: string, value: string): void {
    localStorage.setItem(name, JSON.stringify(value));
}

export function getLocalStorageItem(name: string): string | null {
    return localStorage.getItem(name);
}
