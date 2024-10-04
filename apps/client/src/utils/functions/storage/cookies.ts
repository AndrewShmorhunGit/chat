export function setCookie(name: string, value: string, days: number): void {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

export function getCookie(name: string): string | null {
    const cookie = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
}
