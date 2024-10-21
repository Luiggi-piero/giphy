import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GiphyService } from '../../services/giphy.service';
import { HistoryService } from '../../services/history.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  private giphyService = inject(GiphyService);
  private historyService = inject(HistoryService);
  private subscription = new Subscription();

  searchTerm = '';
  showRecentSearches = false;
  isSubmit = false;

  ngOnInit(): void {
    this.subscription = this.historyService.getShowModalObservable().subscribe({
      next: show => this.showRecentSearches = show
    })
  }

  public getGifs(): void {
    this.isSubmit = true;

    if (this.searchTerm.trim() === '') return;

    this.giphyService.searchGifs(this.searchTerm);
    this.searchTerm = '';
    this.isSubmit = false;
  }

  public showHistorial() {
    this.historyService.showModal();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
