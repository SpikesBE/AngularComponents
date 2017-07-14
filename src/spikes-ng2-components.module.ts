import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {SpikesTreeviewComponent, SpikesTreeviewItemComponent} from './components/spikes-treeview/';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        SpikesTreeviewComponent,
        SpikesTreeviewItemComponent
    ],
    declarations: [
        SpikesTreeviewComponent,
        SpikesTreeviewItemComponent
    ],
    providers: [],
})
export class SpikesNg2ComponentsModule { 
    // static forRoot(): ModuleWithProviders{
    //     return {ngModule: SpikesNg2ComponentsModule, providers:[]};
    // }
}