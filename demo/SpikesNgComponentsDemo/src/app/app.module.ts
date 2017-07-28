import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SpikesNg2ComponentsModule } from 'spikes-ng2-components';

import { AppComponent } from './app.component';
import { SpikesTreeviewDemoComponent } from './spikes-treeview-demo/spikes-treeview-demo.component';
import { SpikesTimelineDemoComponent } from './spikes-timeline-demo/spikes-timeline-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    SpikesTreeviewDemoComponent,
    SpikesTimelineDemoComponent
  ],
  imports: [
    BrowserModule,
    SpikesNg2ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
