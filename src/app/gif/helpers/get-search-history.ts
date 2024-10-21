import { KEYS } from "../constants/keys-localstorage";

export function getSearchHistory(): string[] {
    const searchHistoryLocalStorage = localStorage.getItem(KEYS.searchHistory);

    if (!searchHistoryLocalStorage) return []

    return JSON.parse(searchHistoryLocalStorage);
}