import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as models from './models/';

@Component({
  selector: 'spikes-timeline',
  templateUrl: './spikes-timeline.component.html',
  styleUrls: ['./spikes-timeline.component.css']
})
export class SpikesTimelineComponent implements OnInit {
  private _timelineItems: Array<models.TimelineItem> = [];

  @Input() 
  set timelineItems(value: Array<models.ITimelineItem>) {
    this._timelineItems = value;
  }
  get timelineItems(): Array<models.ITimelineItem> {
      return this._timelineItems;
  }  

  @Output() timelineItemClick: EventEmitter<models.ITimelineEventArgs> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    
  }

  private onLineitemClick(item: models.ITimelineItem): void {
    this.deactivateAllItems();
    item.isActive = true;
    this.timelineItemClick.emit(item);
  }

  private deactivateAllItems():void{
    this._timelineItems.forEach(item => item.isActive = false);
  }
}