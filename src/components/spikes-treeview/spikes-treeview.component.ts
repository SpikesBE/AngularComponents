import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as models from './models/';

@Component({
  selector: 'spikes-treeview',
  templateUrl: './spikes-treeview.component.html',
  styleUrls: ['./spikes-treeview.component.scss']
})
export class SpikesTreeviewComponent implements OnInit {
  private _treeviewConfiguration: models.ITreeviewConfiguration;
  private _treeviewItems: Array<models.TreeviewItem> = [];  

  @Input()
  set treeviewConfiguration(config: models.ITreeviewConfiguration){
    this._treeviewConfiguration = new models.TreeviewConfiguration();
    Object.assign(this._treeviewConfiguration, models.TreeviewConfiguration.defaultTreeviewConfiguration, config);
  }
  get treeviewConfiguration(){
    if (this._treeviewConfiguration == null){
      this._treeviewConfiguration = new models.TreeviewConfiguration();
      Object.assign(this._treeviewConfiguration, models.TreeviewConfiguration.defaultTreeviewConfiguration);
    }
    return this._treeviewConfiguration;
  }

  @Input()
  set treeviewItems(items: Array<models.TreeviewItem>) {
    this._treeviewItems = [...items];
  };
  get treeviewItems() {
    return this._treeviewItems;
  }

  @Output() gridAction = new EventEmitter();

  constructor() { }

  ngOnInit() {    
  }

  toggleAll(expand: boolean){
    if(this.treeviewItems != null && this.treeviewItems.length > 0){
      this.treeviewItems.forEach(tvi => {
        tvi.expanded = expand;
        this.toggleRecursive(expand, tvi);
      });
    }
  }

  private toggleRecursive(expand: boolean, item: models.TreeviewItem){
    if (item.childItems != null && item.childItems.length > 0){
      item.childItems.forEach(ci => {
        ci.expanded = expand;
        this.toggleRecursive(expand, ci);
      })
    }
  }

}
