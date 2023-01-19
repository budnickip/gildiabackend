import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';

@Module({
  // nasze controllery
  controllers: [CoffeesController],
  //kazdy provider dodany tutaj bedzie widoczny tylko wewnatrz
  // tego modulu, no chyba ze zostanie dodany do tabeli exports
  providers: [CoffeesService],
  // tutaj podajemy servisy, które mają być dostępne wszędzie,
  // gdzie zostanie zaimportowany ten moduł
  // exports: []
  // tutaj importujemy inne moduły, wszystkie serwisy, ktore
  // znajduja sie tabeli exports w zaimportowanym module
  // beda dostepne w tym module
  imports: [TypeOrmModule.forFeature([Coffee])],
  // uzywajac forFeature oznacza, ze ta tabela bedzie dostepna tylko
  // w tym module
})
export class CoffeesModule {}
