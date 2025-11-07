export function getQueryParam(search: string, key: string): string | null {
    const params = new URLSearchParams(search);
    return params.get(key);
}