import { Component, OnInit } from '@angular/core';

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
    // console.log('TimelineItem Clicked');
    // console.log(item);
    // this.timelineItems = [...this.createTimelineItems(6)]
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
