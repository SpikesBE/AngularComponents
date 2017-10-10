import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.scss']
})
export class QuickSearchComponent implements OnInit {
  @Input() quickSearchLabel: string;
  @Input() dataFormatter: (value: any) => string;
  @Input() quickSearch: (text: string) => Observable<any>;
  @Input() minSearchLength: number;
  @Output() itemSelect = new EventEmitter();

  quickSearchInputFormatter: (value: any) => string;
  lookupFormatter: (value: any) => string;

  private searchBusy: boolean = false;
  private searchFailed: boolean = false;
  private searchPerformed: boolean = false;
  private lookupValue: any;
  private searchStart: number = 3;

  private selectedItem: any = null;
  private searchResultLength: number = 0;

  constructor() { }

  ngOnInit() {
    if(this.dataFormatter != null){
      this.quickSearchInputFormatter = this.dataFormatter;
      this.lookupFormatter = this.dataFormatter;
    }
    else{
      this.quickSearchInputFormatter = (x: any) => x.toString();
      this.lookupFormatter = (x: any) => x.toString();
    }
    if (this.minSearchLength != null){
      this.searchStart = this.minSearchLength;
    }
  }

  doQuickSearch = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searchBusy = true)
      .switchMap(term => {
          if(term.length < this.searchStart){
            this.itemSelect.emit(null);
            return Observable.of([]);
          }
          else{
            if (this.quickSearch){
              this.selectedItem = null;
              return this.quickSearch(term)
                .finally(() => this.searchPerformed = true)
                .do((rslt: Array<any>) => {
                  this.searchFailed = false;
                  this.searchResultLength = rslt ? rslt.length : 0;
                })
                .catch(() => {
                  this.searchFailed = true;
                  this.itemSelect.emit(null);
                  return Observable.of([]);
                });
            }
            else{
              this.itemSelect.emit(null);
              return Observable.of([]);
            }
          }
      })
      .do(() => this.searchBusy = false);

  private onSelectItem(eventArgs: NgbTypeaheadSelectItemEvent){
    this.searchPerformed = false;
    this.selectedItem = eventArgs.item;
    this.itemSelect.emit(this.selectedItem);
  }

  private onQuickSearchBlur(event: any){
    //clear lookup when no item selected
    setTimeout(()=> {
      if (this.selectedItem == null){
        this.reset();
      }
    }, 250);
  }

  public reset():void{
    this.lookupValue = '';
    this.searchBusy = false;
    this.searchFailed = false;
    this.searchPerformed = false;
    this.searchResultLength = 0;
    this.doQuickSearch(Observable.of(''));
  }
}
