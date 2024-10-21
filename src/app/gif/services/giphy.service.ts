import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { saveSearchTerm } from '../helpers/save-search-term';
import { verifyExistence } from '../helpers/verify-existence';
import { Datum, ResponseGiphy } from '../interfaces/IResponseGiphy';
import { HistoryService } from './history.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  private historyService = inject(HistoryService);
  private loaderService = inject(LoaderService);

  private readonly API_KEY = 'u4Pg7uL0NjezQiy2MCWV9ZUh2rCb5Y4e';
  private readonly URL_BASE = 'https://api.giphy.com/v1/gifs';

  private gifsSubject = new BehaviorSubject<Datum[]>([]);
  private gifs$ = this.gifsSubject.asObservable();

  constructor(private http: HttpClient) { }

  searchGifs(text: string, fromHistory: boolean = false): void {
    this.gifsSubject.next([]);
    this.loaderService.showLoading();
    text = text.toLocaleLowerCase().trim();
    const existsInHistory = verifyExistence(this.historyService.getValueHistory(), text);

    if (!fromHistory && !existsInHistory) {
      saveSearchTerm(text);
      this.historyService.readHistory();
    }

    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('q', text);

    this.http.get<ResponseGiphy>(`${this.URL_BASE}/search`, { params }).subscribe({
      next: res => {
        this.gifsSubject.next(res.data);
        this.historyService.hideModal();
        this.loaderService.hideLoading();
      },
      error: () => this.loaderService.hideLoading()
    });
  }

  getGifsObservable(): Observable<Datum[]> {
    return this.gifs$;
  }
}
