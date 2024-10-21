import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private showLoadingSubject = new BehaviorSubject<boolean>(false);
  private showLoading$ = this.showLoadingSubject.asObservable();

  constructor() { }

  showLoading(): void {
    this.showLoadingSubject.next(true);
  }

  hideLoading(): void {
    this.showLoadingSubject.next(false);
  }

  getShowLoadingObservable(): Observable<boolean> {
    return this.showLoading$;
  }
}
