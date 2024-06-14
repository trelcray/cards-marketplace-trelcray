export interface IUser {
  id?: string;
  name: string;
  email: string;
}

export interface ICard {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
}

export interface ICurrentUserResponse {
  id: string;
  name: string;
  email: string;
  cards: ICard[];
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IRegisterResponse {
  userId: string;
}

export interface IAddCardResponse {
  cardIds: string;
}

export interface ITradeCard {
  id: string;
  cardId: string;
  tradeId: string;
  type: string;
  card: ICard;
}

export interface ITradeInfo {
  id: string;
  userId: string;
  createdAt: string;
  user: IUser;
  tradeCards: ITradeCard[];
}

export interface IGetTradeResponse {
  list: ITradeInfo[];
  rpp: number;
  page: number;
  more: boolean;
}

export interface IGetCardsResponse {
  list: ICard[];
  rpp: number;
  page: number;
  more: boolean;
}

export interface ICreateTradeCardRequest {
  cardId: string;
  type: "RECEIVING" | "OFFERING";
}

export interface ICreateTradeCardResponse {
  tradeId: string;
}