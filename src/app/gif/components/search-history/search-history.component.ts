import { Component, inject, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { Observable } from 'rxjs';
import { GiphyService } from '../../services/giphy.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {

  private historyService = inject(HistoryService);
  private giphyService = inject(GiphyService);
  searchHistory$: Observable<string[]> = new Observable();

  ngOnInit(): void {
    this.searchHistory$ = this.historyService.getSearchHistoryObservable();
  }

  searchFromHistory(term: string) {
    this.giphyService.searchGifs(term, true);
  }

  deleteSerchTerm(term: string) {
    this.historyService.deleteSearchTerm(term);
  }

  hideHistory() {
    this.historyService.hideModal();
  }
}
