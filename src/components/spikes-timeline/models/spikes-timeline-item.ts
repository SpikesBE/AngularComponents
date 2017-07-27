export interface ITimelineItem{
  id: string|number;
  displayText: string;
  color: string;  
  isActive: boolean;
}

export class TimelineItem implements ITimelineItem{
  id: string|number;
  displayText: string;
  color: string;  
  isActive: boolean;

  constructor(obj: ITimelineItem){
    if (obj != null){
      Object.assign(this, obj);
    }
  }
}