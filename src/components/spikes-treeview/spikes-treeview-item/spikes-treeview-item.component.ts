import { Component, OnInit, Input } from '@angular/core';
import * as models from '../models/';

@Component({
  selector: 'spikes-treeview-item',
  templateUrl: './spikes-treeview-item.component.html',
  styleUrls: ['./spikes-treeview-item.component.scss']
})
export class SpikesTreeviewItemComponent implements OnInit {
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
    this.normalizeTreeviewItemParents();
  };
  get treeviewItems() {
    return this._treeviewItems;
  }

  constructor() { }

  ngOnInit() {
  }

  private normalizeTreeviewItemParents(): void{
    if (this.treeviewItems != null && this.treeviewItems.length > 0){
      this.treeviewItems.forEach(tvi => {
        this.setParentItemRecursive(tvi.childItems, tvi);
      });
    }
  }

  private setParentItemRecursive(childItems: Array<models.TreeviewItem>, parentItem: models.TreeviewItem){
    if (childItems != null &&childItems.length > 0){
      childItems.forEach(ci => {
        ci.parentItem = parentItem;
        this.setParentItemRecursive(ci.childItems, ci);
      })
    }
  }

}
