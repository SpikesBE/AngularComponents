export interface ITimelineEventArgs{

}

export class TimelineEventArgs implements ITimelineEventArgs{

  constructor(obj?: ITimelineEventArgs){
    if (obj != null){
      Object.assign(this, obj);
    }
  }
}