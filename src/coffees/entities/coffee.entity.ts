import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//kazda klasa z decoratorem entity reprezentuje naszą tabalę w SQLU, tabela w sqlu będzie
// taka sama jak nazwa naszej klasy z małych liter, tutaj będzie coffee
@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn() // columna w tabeli // z tym decoratorem automatycznie sie generuje
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;
  // wszystkie columny które nie mają nullable, są required by default
  @Column('json', { nullable: true })
  flavors: string[];
}
