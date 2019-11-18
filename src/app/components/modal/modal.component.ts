import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Card, Label } from "src/app/models/card";
import { APIService } from "src/app/services/api.service";
import { InitializerService } from "src/app/services/initializer.service";
import { ListInfo } from "src/app/models/listInfo";
import { Observable } from "rxjs";
import LabelJson from "../../../assets/labels.json";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
  labelsParsed: Array<string[]> = new Array<string[]>();
  listsInfo: Observable<[ListInfo[]]>;
  listInfo: ListInfo[];

  @Input() index: number;
  @Input() visible: boolean;
  @Input() selected: Array<Card> = new Array<Card>();

  @Output() sendVisible = new EventEmitter<boolean>();

  selectedLabels: Array<Label> = new Array<Label>();
  cardToPost: Card = {};

  constructor(
    private apiService: APIService,
    private initializerService: InitializerService
  ) {}

  ngOnInit() {
    this.listsInfo = this.initializerService.listsInfo;
    this.listsInfo.subscribe(data => {
      this.listInfo = data[this.index];
    });
    this.parseLabels();
  }

  onSubmit() {}

  ngOnChanges() {
    // this.setLabels();
    console.log(this.cardToPost);
    console.log(this.selectedLabels);
    console.log(this.labelsParsed);

    // console.log(this.selected);
  }

  setLabels() {
    if (this.selectedLabels.length > 0)
      this.selectedLabels.forEach(element => {
        this.cardToPost.labels.push(element);
      });
  }

  createCard() {
    console.log("sending");

    return this.apiService
      .postCard(this.cardToPost)
      .subscribe(data => console.log(data));
  }

  parseLabels() {
    LabelJson.forEach(element => {
      this.labelsParsed.push([
        element.name.split(": ").splice(1),
        element.name
      ]);
    });
    // console.log(this.labelsParsed);
  }

  onFileSelected() {}

  close() {
    this.visible = false;
    this.sendClose();
    // this.cardToPost = {};
  }

  sendClose() {
    this.sendVisible.emit(this.visible);
  }
}
