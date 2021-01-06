import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AssetGridComponent } from './views/asset-grid/asset-grid.component';
import { DataSourceGridComponent } from './views/data-source-grid/data-source-grid.component';
import { ServerPaginationComponent } from './views/server-pagination/server-pagination.component';
import { ClientPaginationComponent } from './views/client-pagination/client-pagination.component';
import { EditorGridComponent } from './views/editor-grid/editor-grid.component';
import { RendererGridComponent } from './views/renderer-grid/renderer-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    AssetGridComponent,
    DataSourceGridComponent,
    ServerPaginationComponent,
    ClientPaginationComponent,
    EditorGridComponent,
    RendererGridComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
