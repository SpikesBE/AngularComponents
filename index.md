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

### Getting selected items
```js
///Get a flat list of selected items
TreeviewHelper.getTreeviewSelectedItems(items: Array<ITreeviewItem>): Array<ITreeviewItem>
///Get a list of selected items grouped by level in the treeview
TreeviewHelper.getTreeviewSelectedItemsPerLevel(items: Array<ITreeviewItem>): Array<ITreeviewLevel>
```

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

## Timeline

![Timeline](/AngularComponents/img/SpikesTimeline.png "Timeline Sample")

Timeline is a visual representation of a number of steps.
Clicking on a step moves the focus to that step and outputs an event on which you can subscribe to do something.

### Usage

```html
<spikes-timeline [timelineItems]="timelineItems" (timelineItemClick)="onTimelineItemAction($event)"></spikes-timeline>
```

```js
import * as tl from 'spikes-ng2-components';

@Component({
  selector: 'app-spikes-timeline-demo',
  templateUrl: './spikes-timeline-demo.component.html',
  styleUrls: ['./spikes-timeline-demo.component.css']
})
export class SpikesTimelineDemoComponent implements OnInit {

  timelineItems: Array<tl.ITimelineItem> = [];

  constructor() { }

  ngOnInit() {
    this.timelineItems = [...this.createTimelineItems(5)];
  }

  private onTimelineItemAction(item: tl.ITimelineEventArgs){
    console.log('TimelineItem Clicked');
    console.log(item);
    this.timelineItems = [...this.createTimelineItems(6)]
  }

  private createTimelineItems(maxItems: number): Array<tl.ITimelineItem>{
    let items: Array<tl.ITimelineItem> = [];
    for (let i: number = 0; i < maxItems; i++){
      items.push(new tl.TimelineItem({
        id: i,
        displayText: `Item ${i.toString()}`,
        color: i < 2 ? 'primary' : i < 3 ? 'secondary' : i === 3 || i === 5 ? 'test' : 'grey',
        isActive: i === 0 ? true : false
      }));
    }
    return items;
  }
}
```

### Configuration

There's no configuration at this time.
Maybe later on additional features can be added.

### Colors

By default, 3 colors can be set on a timeline item:
* Grey
* Primary
* Secondary

It is however easy to provide additional colors.
Custom coloring (name=test):

```scss
.test{
  background-color: #de6764;

  $after{
    border-left: 12px solid #de6764;
  }
}
```