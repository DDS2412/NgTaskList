import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Card, Label, Member } from "src/app/models/card";
import { APIService } from "src/app/services/api.service";
import { InitializerService } from "src/app/services/initializer.service";
import { ListInfo } from "src/app/models/listInfo";
import { Observable } from "rxjs";
import LabelJson from "../../../assets/labels.json";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from "@angular/forms";
import { BoardInfo } from "src/app/models/boardInfo.js";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
  labelsParsed: Array<string[]> = new Array<string[]>();
  listsInfo: Observable<[ListInfo[]]>;
  listInfo: ListInfo[];
  labelsList: Observable<[Label[]]>;
  labelList: Label[] = [];
  membersArray: Member[];
  formGroup: FormGroup;
  labels = LabelJson;
  selectedMembers: Member[];
  selectedLabels: Label[];

  @Input() index: number;
  @Input() visible: boolean = false;
  @Input() selected: Array<Card> = new Array<Card>();

  @Output() sendVisible = new EventEmitter<boolean>();

  cardToPost: Card = {};

  constructor(
    private apiService: APIService,
    private initializerService: InitializerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.listsInfo = this.initializerService.listsInfo;
    this.listsInfo.subscribe(data => {
      this.listInfo = data[this.index];
    });
    this.labelsList = this.initializerService.labelList;
    this.labelsList.subscribe(data => {
      data[this.index].forEach(element => {
        if (element.name) {
          this.labelList.push(element);
        }
      });
    });
    this.apiService
      .getBoardsMembers(this.listInfo[0].idBoard)
      .subscribe(data => {
        this.membersArray = data;
      });
    this.parseLabels();
  }

  onSubmit() {}
  onFileSelected() {}

  ngOnChanges() {
    if (this.selected.length > 0) {
      this.createFormGroup(this.selected[0]);
    } else if (this.visible === true) {
      this.createEmptyFormGroup();
    }
    // console.log(this.labelList);

    // this.setLabels();
    // console.log(this.cardToPost);
    // console.log(this.selectedLabels);
    // console.log(this.labelsParsed);
  }
  private createFormGroup(card: Card) {
    let due = new Date(card.due);
    this.formGroup = this.formBuilder.group({
      name: [card.name, [Validators.required]],
      desc: [card.desc],
      due: [
        due.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        })
      ],
      idList: [card.idList, [Validators.required]],
      labels: [card.labels[0].id],
      members: [card.members[0].id]
    });
  }

  private createEmptyFormGroup() {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      desc: [null],
      due: [null],
      idList: [null, [Validators.required]],
      labels: [null],
      members: [null]
    });
  }

  private resetForm() {
    this.formGroup.reset();
  }

  parseLabels() {
    LabelJson.forEach(element => {
      this.labelsParsed.push([
        element.name
          .split(": ")
          .splice(1)
          .toString(),
        element.name
      ]);
    });
  }

  createCard() {
    if (this.selected.length > 0) {
      this.cardToPost = this.formGroup.value;
      this.cardToPost.id = this.selected[0].id;
      this.cardToPost.labels = [{ id: this.formGroup.get("labels").value }];
      this.cardToPost.members = [{ id: this.formGroup.get("members").value }];
      return this.apiService.putCard(this.cardToPost).subscribe(data => {
        this.initializerService.updateCard(data, this.index);
      });
    } else {
      this.cardToPost = this.formGroup.value;
      this.cardToPost.labels = [{ id: this.formGroup.get("labels").value }];
      this.cardToPost.members = [
        {
          id: this.formGroup.get("members").value,
          fullName: this.membersArray.find(
            m => m.id === this.formGroup.get("members").value
          ).fullName
        }
      ];
      return this.apiService.postCard(this.cardToPost).subscribe(data => {
        this.initializerService.addCard(data, this.cardToPost, this.index);
      });
    }
  }

  close() {
    this.visible = false;
    this.sendClose();
    this.resetForm();
    // this.cardToPost = {};
  }

  sendClose() {
    this.sendVisible.emit(this.visible);
  }
}
