import { ITreeviewItem, ITreeviewLevel, TreeviewLevel } from './'
export class TreeviewHelper{    
    static getTreeviewSelectedItems(items: Array<ITreeviewItem>): Array<ITreeviewItem>{
        let selectedItems: Array<ITreeviewItem> = [];
        items.forEach(tvi => {
            if (tvi.checked) selectedItems.push(tvi);
            this.getTreeviewSelectedItemsRecursive(tvi.childItems, selectedItems);
        });
        return selectedItems
    }

    static getTreeviewSelectedItemsPerLevel(items: Array<ITreeviewItem>): Array<ITreeviewLevel>{
        let levels: Array<ITreeviewLevel> = [];
        let level: ITreeviewLevel = TreeviewHelper.getTreeviewLevel(1, levels);
        items.forEach(tvi => {
            if (tvi.checked) level.items.push(tvi);
            this.getTreeviewSelectedItemsPerLevelRecursive(tvi.childItems, levels, 2);
        });
        return levels
    }

    private static getTreeviewSelectedItemsRecursive(childItems: Array<ITreeviewItem>, selectedItems: Array<ITreeviewItem>): void{    
        if(childItems != null && childItems.length > 0){            
            childItems.forEach(tvi => {
                if (tvi.checked) selectedItems.push(tvi);
                this.getTreeviewSelectedItemsRecursive(tvi.childItems, selectedItems);
            });
        }
    }

    private static getTreeviewSelectedItemsPerLevelRecursive(childItems: Array<ITreeviewItem>, levels: Array<ITreeviewLevel>, lvl: number): void{    
        if(childItems != null && childItems.length > 0){        
            let level: ITreeviewLevel = TreeviewHelper.getTreeviewLevel(lvl, levels);
            childItems.forEach(tvi => {
                if (tvi.checked) level.items.push(tvi);
                this.getTreeviewSelectedItemsPerLevelRecursive(tvi.childItems, levels, lvl + 1);
            });
        }
    }

    private static getTreeviewLevel(lvl: number, lvls: Array<ITreeviewLevel>): ITreeviewLevel{
        let level: ITreeviewLevel = lvls.find(l => l.level === lvl);
        if (level == null){
            level = new TreeviewLevel({level: lvl});
            lvls.push(level);
        }
        return level;
    }
}