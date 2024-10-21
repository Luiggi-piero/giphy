import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ListGifsComponent } from './components/list-gifs/list-gifs.component';
import { SearchHistoryComponent } from './components/search-history/search-history.component';
import { SearchComponent } from './components/search/search.component';



@NgModule({
  declarations: [
    SearchComponent,
    ListGifsComponent,
    SearchHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    SearchComponent,
    ListGifsComponent
  ]
})
export class GifModule { }
