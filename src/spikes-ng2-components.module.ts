import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/switchMap';

import {QuickSearchComponent} from './components/spikes-quicksearch/';
import {SpikesTreeviewComponent, SpikesTreeviewItemComponent} from './components/spikes-treeview/';
import {SpikesTimelineComponent} from './components/spikes-timeline/';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
    ],
    exports: [
        QuickSearchComponent,
        SpikesTimelineComponent,
        SpikesTreeviewComponent,
        SpikesTreeviewItemComponent
    ],
    declarations: [
        QuickSearchComponent,
        SpikesTimelineComponent,
        SpikesTreeviewComponent,
        SpikesTreeviewItemComponent
    ],
    providers: [],
})
export class SpikesNg2ComponentsModule { 
    static forRoot(): ModuleWithProviders{
        return {ngModule: SpikesNg2ComponentsModule, providers:[]};
    }
}