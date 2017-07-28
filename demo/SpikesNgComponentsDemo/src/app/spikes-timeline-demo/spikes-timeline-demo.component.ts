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
    for (let i: number = 0; i < 5; i++){
      this.timelineItems.push(new tl.TimelineItem({
        id: i,
        displayText: `Item ${i.toString()}`,
        color: i < 3 ? 'primary' : i === 3 ? 'test' : 'grey',
        isActive: i === 0 ? true : false
      }));
    }
  }

  private onTimelineItemAction(item: tl.ITimelineEventArgs){
    console.log('TimelineItem Clicked');
    console.log(item);
  }

}
