import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Datum } from '../../interfaces/IResponseGiphy';
import { GiphyService } from '../../services/giphy.service';
import { Observable, Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-list-gifs',
  templateUrl: './list-gifs.component.html',
  styleUrls: ['./list-gifs.component.css']
})
export class ListGifsComponent implements OnInit, OnDestroy {

  private gifService = inject(GiphyService);
  private loaderService = inject(LoaderService);
  subscription = new Subscription();
  showLoading = false;

  gifs$: Observable<Datum[]> = new Observable();

  ngOnInit(): void {
    this.gifs$ = this.gifService.getGifsObservable();
    this.subscription = this.loaderService.getShowLoadingObservable().subscribe({
      next: res => this.showLoading = res
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
