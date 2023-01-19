import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  // pokaz ile metod jest dostepnych z TypeORM repozytorium
  findAll() {
    return this.coffeeRepository.find();
  }

  async findOne(id: number) {
    // find one zwroci promise, wiec musimy poczekac na wynik, stad await
    const coffee = await this.coffeeRepository.findOne({ where: { id: +id } });
    // jesli nie znajdzie kawy o takim id, to rzuć błędem, NestJS dostarcza wiele
    // wbudowanych exceptionów, do których mozemy przekazywac tylko tekst, a error code'y
    // dogrywa za nas
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    // musimy utworzyć instancje klasy Coffee na podstawie naszego DTO
    // i zapisac ja do zmiennej coffee
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    // teraz musimy juz tylko wywolac metode save i nasze nowe
    // entity bedzie zapisane w bazie danych
    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    // preload tworzy nowe entity na podstawie obiektu wrzuconego do niego
    // najpierw sprawdza czy takie entity istnieje juz bazie danych
    // jesli tak to je zwraca i zamienia wszystkie wartosci
    // ktore zostały przekazane w updateCoffeInput na nowe
    // jeśli id nie zostanie znalezione w bazie danych, to funkcja ta
    // zwroci undefined
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    // uzyjmy metody ktorą stworzylismy do odnalezienia
    // kawy po id
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
