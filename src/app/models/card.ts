export interface Card {
  id:          string;
  name:        string;
  desc:        string;
  labels:      Label[];
  due:         Date | null;
  dueComplete: boolean;
  attachments: Attachment[];
  members:     Member[];
  actions:     Action[];
}

export interface Action {
  id:              string;
  idMemberCreator: string;
  data:            Data;
  type:            string;
  date:            Date;
  limits:          Limits;
  memberCreator:   MemberCreator;
}

export interface Data {
  card:  CardClass;
  list:  List;
  board: Board;
}

export interface Board {
  id:        string;
  name:      string;
  shortLink: string;
}

export interface CardClass {
  id:        string;
  name:      string;
  idShort:   number;
  shortLink: string;
}

export interface List {
  id:   string;
  name: string;
}

export interface Limits {
}

export interface MemberCreator {
  id:                 string;
  activityBlocked:    boolean;
  avatarHash:         null;
  avatarUrl:          null;
  fullName:           string;
  idMemberReferrer:   null;
  initials:           string;
  nonPublic:          Limits;
  nonPublicAvailable: boolean;
  username:           string;
}

export interface Attachment {
  id:  string;
  url: string;
}

export interface Label {
  id:      string;
  idBoard: string;
  name:    string;
  color:   string;
}

export interface Member {
  id:       string;
  fullName: string;
}
