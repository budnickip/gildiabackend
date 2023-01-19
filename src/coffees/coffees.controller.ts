import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';

@Controller('coffees') //powiązannie /coffees url z tym kontrolerem
export class CoffeesController {
  // tutaj mozemy wstrzykiwac nasze providery
  // nest handluje wstrzykiwanie zaleznosci za nas
  // musimy tylko
  // private, ze moze byc wykorzystywane wewnatrz tej klasy
  // readonly to bardziej tylko dobra praktyka,
  // ktora ma nas utwierdzic ze nie mozemy modyfikowac referencji serwisu
  // i ze mamy tylko dostep do funkcji ktore nam daje
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  findAll() {
    return this.coffeesService.findAll();
  }

  //zeby zdefiniowac parametry naszej routy
  // oznacza to ze oczekujemy dynamicznego parametru id
  @Get(':id')
  // param decorator pozwala przechwycić parametry z przychodzącego
  // zapytania i uzywac ich wewnatrz naszej funkcji
  // jesli nie przekazalibysmy do funkcji, to otrzymalibysmy wszystkie
  // parametry ktore ktos przysle w requescie
  // ale w naszym przypadku bedziemy potrzebowali tylko id.
  // wiec przekazemy stringa id w naszym dekoratorze
  // domyślnie stworzy nam id jako stringa, ale dzięki ParseIntPipe,
  // przekonwertuje go nam na number za nas
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  // dzieki decoratorowi body, otrzymamy wszystko co przychodzi
  // w body
  // dzieki CreateCoffeeDto mamy type safety i wiemy czego mozemy sie
  // spodziewac po payloadzie
  create(@Body() createCoffeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeDto);
  }

  // id której kawy będziemy chcieli updateować,
  // w body przyjda pola, ktore maja byc zaktualizowane
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coffeesService.remove(id);
  }
}
