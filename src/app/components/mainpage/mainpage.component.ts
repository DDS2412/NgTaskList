import { Component, OnInit } from "@angular/core";
import { ModalService } from "../../services/modal.service";
import { APIService } from "../../services/api.service";
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from 'src/app/models/userInfo';


@Component({
  selector: "app-mainpage",
  templateUrl: "./mainpage.component.html",
  styleUrls: ["./mainpage.component.scss"]
})
export class MainpageComponent implements OnInit {
  selected = [];
  userInfo: UserInfo;
  boardInfo: Array<{}> = new Array<{}>();

  constructor(private modalService: ModalService, private apiService: APIService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { userInfo: UserInfo }) => {
      this.userInfo = data.userInfo;
    });
    this.addBoardInfo();
  }

  addBoardInfo() {
    this.userInfo.idBoards.forEach(element => {
      this.apiService.getBoardsInfo(element).subscribe((data) => {
        this.boardInfo.push(data);
      });
    });
  }

  receiveSelected($event) {
    this.selected = $event;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
}
