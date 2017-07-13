export interface ITreeviewConfiguration{
    initExpandAll?: boolean;
    showToggleAll?: boolean;
    showSelection?: boolean;
    mainFont?: string;
    expandIcon?: string;
    collapseIcon?: string;
    checkedIcon?: string;
    uncheckedIcon?: string;
    indeterminateIcon?: string;
}

export class TreeviewConfiguration implements ITreeviewConfiguration{
    initExpandAll?: boolean;
    showToggleAll?: boolean;
    showSelection?: boolean;
    mainFont?: string;
    expandIcon?: string;
    collapseIcon?: string;
    checkedIcon?: string;
    uncheckedIcon?: string;
    indeterminateIcon?: string;

    constructor(obj?: ITreeviewConfiguration){
        if (obj != null){
            Object.assign(this, obj);
        }
    }

    static get defaultTreeviewConfiguration(): ITreeviewConfiguration{
        return new TreeviewConfiguration({
            initExpandAll: false,
            showToggleAll: false,
            showSelection: true,
            mainFont: 'fa',
            expandIcon: 'fa-chevron-right',
            collapseIcon: 'fa-chevron-down',
            checkedIcon: 'fa-check-square-o',
            uncheckedIcon: 'fa-square-o',
            indeterminateIcon: 'fa-minus-square-o'
        });
    }
}