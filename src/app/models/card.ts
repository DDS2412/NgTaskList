export interface Card {
  id:          string;
  name:        string;
  desc:        string;
  labels:      Label[];
  due:         Date | null;
  dueComplete: boolean;
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
  card:  Ard;
  list:  List;
  board: Ard;
}

export interface Ard {
  id:        string;
  name:      string;
  shortLink: string;
  idShort?:  number;
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
