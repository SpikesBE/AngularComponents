export enum CheckState{
    Checked = 1,
    Indeterminate = 2,
    Unchecked = 3
}

export interface ITreeviewItem{
    id: string|number;
    displayText: string;  
    itemState?: CheckState;
    expanded?: boolean;
    checked?: boolean;
    childItems?: Array<ITreeviewItem>;
    parentItem?: TreeviewItem;
}

export class TreeviewItem implements ITreeviewItem{
    id: string|number;
    displayText: string;
    itemState?: CheckState = CheckState.Unchecked;
    expanded?: boolean = false;
    checked?: boolean = false;
    childItems?: Array<TreeviewItem> = [];
    parentItem?: TreeviewItem;

    constructor(obj?: ITreeviewItem){
        if (obj != null){
            Object.assign(this, obj);
            if (obj.childItems != null && obj.childItems.length > 0){
                this.childItems = [];
                obj.childItems.forEach(ci => {
                    this.childItems.push(new TreeviewItem(ci));
                    this.childItems[this.childItems.length - 1].parentItem = this;
                });
            }
        }
    }

    toggle(): void{
        this.expanded = !this.expanded;
    }

    setState(oldState: CheckState, newState: CheckState): void{  
        this.setTreeviewItemState(this, newState);
        this.setStateRecursive(oldState, newState);
        this.setParentStateRecursive(this.parentItem, newState);
    }

    setStateRecursive(oldState: CheckState, newState: CheckState): void{
        this.childItems.forEach(item => {
            this.setTreeviewItemState(item, newState);
            item.setStateRecursive(oldState, newState);
        });
    }

    setParentStateRecursive(parent: TreeviewItem, newState: CheckState): void{
        if(parent != null){
            if (newState === CheckState.Unchecked){
                if (parent.itemState === CheckState.Checked){
                    this.setTreeviewItemState(parent, CheckState.Indeterminate);
                    parent.setParentStateRecursive(parent.parentItem, newState);
                }
                else if (parent.itemState === CheckState.Indeterminate){
                    let item: TreeviewItem = parent.childItems.find(i => (i.itemState === CheckState.Checked || i.itemState === CheckState.Indeterminate));
                    if (item == null){
                        this.setTreeviewItemState(parent, CheckState.Unchecked);
                        parent.setParentStateRecursive(parent.parentItem, newState);
                    }
                }
            }
            else if (newState === CheckState.Checked){
                if (parent.itemState !== CheckState.Checked){
                    let item: TreeviewItem = parent.childItems.find(i => i.itemState !== CheckState.Checked);
                    if (item == null){
                        this.setTreeviewItemState(parent, newState);
                        parent.setParentStateRecursive(parent.parentItem, newState);
                    }
                    else{
                        this.setTreeviewItemState(parent, CheckState.Indeterminate);
                        parent.setParentStateRecursive(parent.parentItem, newState);
                    }
                }
            }
        }
    }

    private setTreeviewItemState(item: TreeviewItem, newState: CheckState):void{
        item.itemState = newState;
        item.checked = newState === CheckState.Checked;
    }
}