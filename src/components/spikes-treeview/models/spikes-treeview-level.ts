import { ITreeviewItem, TreeviewItem } from './spikes-treeview-item';

export interface ITreeviewLevel{
    level: number;
    items?: Array<ITreeviewItem>;    
}

export class TreeviewLevel implements ITreeviewLevel{
    level: number;
    items?: Array<ITreeviewItem> = [];

    constructor(obj?: ITreeviewLevel){
        if (obj != null){
            Object.assign(this, obj);
        }
    }
}