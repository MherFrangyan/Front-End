import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {AddPostComponent} from './main/add-post/add-post.component';
import {PostsComponent} from "./main/posts/posts.component";
import {ChartComponent} from "./main/chart/chart.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FilterPipe } from './main/pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddPostComponent,
    PostsComponent,
    ChartComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
