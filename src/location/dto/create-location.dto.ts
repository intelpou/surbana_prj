import { IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateLocationDto {
  @IsString()
  @MinLength(2, { message: 'Location number must have at least 2 characters.' })
  @IsNotEmpty()
  location_number: string;

  @IsString()
  @MinLength(1, { message: 'Building must have at least 1 character.' })
  @IsNotEmpty()
  building: string;

  @IsString()
  @MinLength(2, { message: 'Location name must have at least 2 characters.' })
  @IsNotEmpty()
  location_name: string;

  @IsInt()
  area: number;

  @IsString()
  @IsNotEmpty({ message: 'Please input location path.' })
  path: string;
}
