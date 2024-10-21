import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { getSearchHistory } from '../helpers/get-search-history';
import { saveHistory } from '../helpers/save-search-term';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private searchHistorySubject = new BehaviorSubject<string[]>([]);
  private searchHistory$ = this.searchHistorySubject.asObservable();

  private showModalSubject = new BehaviorSubject<boolean>(false);
  private showModal$ = this.showModalSubject.asObservable();

  constructor() {
    this.readHistory();
  }

  getSearchHistoryObservable(): Observable<string[]> {
    return this.searchHistory$;
  }

  readHistory(): void {
    this.searchHistorySubject.next(getSearchHistory());
  }

  deleteSearchTerm(term: string): void {
    let history = this.searchHistorySubject.getValue();
    let termIndex = history.findIndex(h => h === term);
    history.splice(termIndex, 1);

    saveHistory(history);
    this.searchHistorySubject.next(history);
  }

  getShowModalObservable(): Observable<boolean> {
    return this.showModal$;
  }

  showModal(): void {
    this.showModalSubject.next(true);
  }

  hideModal(): void {
    this.showModalSubject.next(false);
  }

  getValueHistory(): string[] {
    return this.searchHistorySubject.getValue();
  }
}
