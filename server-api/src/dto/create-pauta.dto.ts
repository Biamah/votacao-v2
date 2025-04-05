import { IsNotEmpty } from 'class-validator';

export class CreatePautaDto {
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  title: string;

  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  description: string;
}