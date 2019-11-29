import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from "@angular/core";
import { UserInfo } from "src/app/models/userInfo";
import { Card } from "src/app/models/card";
import { TableComponent } from "../table/table.component";
import { BoardInfo } from "src/app/models/boardInfo";
import { Observable } from 'rxjs';
import { InitializerService } from 'src/app/services/initializer.service';

@Component({
  selector: "app-mainpage",
  templateUrl: "./mainpage.component.html",
  styleUrls: ["./mainpage.component.scss"]
})
export class MainpageComponent implements OnInit {
  selected: Array<Card> = new Array<Card>();
  userInfo: Observable<UserInfo>;
  boardInfo: Observable<BoardInfo[]>;
  isModalVisible = false;
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  constructor(
    private initializerService: InitializerService,
  ) {}

  ngOnInit() {
    this.userInfo = this.initializerService.userInfo;
    this.boardInfo = this.initializerService.boardInfo;

    this.initializerService.loadAllBoardsInfo();
  }

  receiveVisible($event) {
    this.isModalVisible = $event;
  }

  receiveSelected($event) {
    this.selected = $event;
  }

  clearSelection() {
    this.table.selected = [];
    this.table.sendSelected();
  }
}
