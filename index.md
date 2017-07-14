# Spikes Angular Components - Docs

Here you will find more information about the usage of the components.
For dependencies and install instructions go to the [readme](https://github.com/SpikesBE/AngularComponents).

## Treeview

![Treeview](/AngularComponents/img/SpikesTreeview.png "Treeview Sample")

The treeview component is built starting from the following requirements:
* Recursive
* Tri-state select visualisation
* Retrieve selected items on a level per level basis

### Usage

```html
<spikes-treeview [treeviewItems]="treeviewItems" [treeviewConfiguration]="treeviewConfiguration"></spikes-treeview>
```

```js
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

  ngOnInit() {}
}
```
### Configuration

|Option|Description|Default|
|---|---|---|
|initExpandAll|Expand all items initially (todo)|false|
|showToggleAll|Show expand/collapse buttons|false|
|showSelection|Show checkboxes|true|
|mainFont|Font for expand/collapse and checkbox icons|fa|
|expandIcon|Icon for expand|fa-chevron-right|
|collapseIcon|Icon for collapse|fa-chevron-down|
|checkedIcon|Icon for checked|fa-check-square-o|
|uncheckedIcon|Icon for unchecked|fa-square-o|
|checkedIcon|Icon for checked|fa-minus-square-o|

### Sample Data

```js
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
```
