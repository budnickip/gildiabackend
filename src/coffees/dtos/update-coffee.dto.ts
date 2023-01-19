// export class UpdateCoffeeDto {
//     readonly name?: string;
//     readonly brand?: string;
//     readonly flavors?: string[];
// }

import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';

// wszystkie typy z CreateCoffeeDto jako optional
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
