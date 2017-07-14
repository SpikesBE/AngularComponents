import { Component, OnInit } from '@angular/core';

import * as tree from 'spikes-ng2-components';

@Component({
  selector: 'app-spikes-treeview-demo',
  templateUrl: './spikes-treeview-demo.component.html',
  styleUrls: ['./spikes-treeview-demo.component.css']
})
export class SpikesTreeviewDemoComponent implements OnInit {

  treeviewItems: Array<tree.ITreeviewItem> = [];
  treeviewConfiguration: tree.ITreeviewConfiguration = new tree.TreeviewConfiguration({
    showToggleAll: true
  });

  constructor() { }

  ngOnInit() {
    this.initTreeview();
  }

  private initTreeview():void{
    let items: Array<tree.ITreeviewItem> = [];

    items = [...this.getMockTreeviewItems("TopLevel", 5)]
    items.forEach(item => {
      item.childItems = [...this.getMockTreeviewItems("DirectChild", 4)];
      item.childItems.forEach(i => {
        i.childItems = [...this.getMockTreeviewItems("LowestLevel", 3)];
      });
    });

    this.treeviewItems = [...items];
  }

  private getMockTreeviewItems(text: string, itemCount: number): Array<tree.ITreeviewItem>{
    let items: Array<tree.ITreeviewItem> = [];

    for(let i: number = 0; i < itemCount; i++){
      items.push(
        new tree.TreeviewItem ({
          id: i+1,
          displayText: `${text}-${(i+1).toString()}`,
          itemState: tree.CheckState.Unchecked
        })
      );
    }

    return items;
  }

}
