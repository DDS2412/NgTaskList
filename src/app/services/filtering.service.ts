import { Injectable } from "@angular/core";
import { Card } from "../models/card";
import { ClrDatagridStringFilterInterface } from "@clr/angular";

@Injectable({
  providedIn: "root"
})
export class FilteringService {
  constructor() {}

  createLabelFilter() {
    return new LabelFilter();
  }
  createAssignedPersonFilter() {
    return new AssignedPersonFilter();
  }
  createCreationDateFilter() {
    return new CreationDateFilter();
  }
  createDeadlineFilter() {
    return new DeadlineFilter();
  }
}

class LabelFilter implements ClrDatagridStringFilterInterface<Card> {
  accepts(card: Card, search: string): boolean {
    return card.labels.some((label, index) => {
      return label.name == search || label.name.toLowerCase().includes(search);
    });
  }
}

class AssignedPersonFilter implements ClrDatagridStringFilterInterface<Card> {
  accepts(card: Card, search: string): boolean {
    return card.members.some((member, index) => {
      return member.fullName == search || member.fullName.toLowerCase().includes(search);
    });
  }
}

class CreationDateFilter implements ClrDatagridStringFilterInterface<Card> {
  accepts(card: Card, search: string): boolean {
    return card.actions.some((action, index) => {
      let date = action.date;
      return (
        new Date(action.date).toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          month: "long",
          day: "numeric"
        }) == search ||
        new Date(action.date)
          .toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            month: "long",
            day: "numeric"
          })
          .toLowerCase()
          .includes(search)
      );
    });
  }
}

class DeadlineFilter implements ClrDatagridStringFilterInterface<Card> {
  accepts(card: Card, search: string): boolean {
    if (card.due !== null) {
      return new Date(card.due)
        .toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          month: "long",
          day: "numeric"
        })
        .toLowerCase()
        .includes(search);
    } else {
      return "Не назначено" == search || "Не назначено".toLowerCase().includes(search);
    }
  }
}
