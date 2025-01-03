export class CreateInfoUserDto {
  userId: string;
  amount: number;
  cardTile: {
    cardId: string;
    cardSecret: string;
  };
}
