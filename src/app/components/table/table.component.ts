import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Card } from "src/app/models/card";
import { FilteringService } from "src/app/services/filtering.service";
import { Observable } from "rxjs";
import { InitializerService } from "src/app/services/initializer.service";
import { ListInfo } from "src/app/models/listInfo";
import { ClrDatagridSortOrder } from '@clr/angular';

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit {
  labelFilter = this.filterService.createLabelFilter();
  assignedPersonFilter = this.filterService.createAssignedPersonFilter();
  creationDateFilter = this.filterService.createCreationDateFilter();
  deadlineFilter = this.filterService.createDeadlineFilter();
  selected: Array<Card> = new Array<Card>();
  boardList: Observable<[Card[]]>;
  board: Card[];
  listsInfo: Observable<[ListInfo[]]>;
  listInfo: ListInfo[];
  descSort = ClrDatagridSortOrder.DESC;

  @Input() index;

  @Output() selectedEvent = new EventEmitter<any[]>();

  constructor(
    private filterService: FilteringService,
    private initializerService: InitializerService
  ) {}

  ngOnInit() {
    this.boardList = this.initializerService.cardList;
    this.boardList.subscribe(data => {
      this.board = data[this.index];
    });
    this.listsInfo = this.initializerService.listsInfo;
    this.listsInfo.subscribe(data => {
      this.listInfo = data[this.index];
    });
  }

  checkDueLate(due: string): boolean {
    let d1 = new Date(due);
    let d2 = new Date();
    if (d2 > d1) {
      return true;
    } else {
      return false;
    }
  }

  checkDueCloseToLate(due: string): boolean {
    let d1 = new Date(due);
    let d2 = new Date();
    let d3 = new Date();
    d3.setMonth(d1.getMonth());
    d3.setDate(d1.getDate() - 3);

    if (d2 < d1 && d2 > d3) {
      return true;
    } else {
      return false;
    }
  }

  slicePriority(str: string): string {
    let res = str.split(": ");
    return res.length > 1 ? res[1] : res[0];
  }

  findListName(card: Card): string {
    return this.listInfo.find(x => x.id === card.idList).name;
  }

  sendSelected() {
    this.selectedEvent.emit(this.selected);
  }
}
