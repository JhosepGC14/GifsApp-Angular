import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//modulos
import { SharedModule } from './shared/shared.module';
import { GifsModule } from './gifs/gifs.module';

//components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedModule, GifsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
