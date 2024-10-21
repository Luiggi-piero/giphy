import { KEYS } from "../constants/keys-localstorage";

export function saveSearchTerm(term: string): void {
    let searchHistory: string[] = [];
    const historyLocalStorage = localStorage.getItem(KEYS.searchHistory);

    if (historyLocalStorage) {
        searchHistory = JSON.parse(historyLocalStorage);
    }
    searchHistory.push(term)
    localStorage.setItem(KEYS.searchHistory, JSON.stringify(searchHistory));
}

export function saveHistory(history: string[]): void {
    const historyString = JSON.stringify(history);
    localStorage.setItem(KEYS.searchHistory, historyString);
}