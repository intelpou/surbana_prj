import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { AllExceptionsFilter } from 'src/util/all-exceptions-filter';

@Controller('location')
@UseFilters(new AllExceptionsFilter())
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get(':location_number')
  findOne(@Param('location_number') location_number: string) {
    return this.locationService.findOne(location_number);
  }

  @Get('get_tree/:location_number')
  findNestedNodesByPath(@Param('location_number') location_number: string) {
    return this.locationService.findNestedNodesByPath(location_number);
  }

  @Patch(':location_number')
  update(@Param('location_number') location_number: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(location_number, updateLocationDto);
  }

  @Delete(':location_number')
  remove(@Param('location_number') location_number: string) {
    return this.locationService.remove(location_number);
  }

  @Delete('delete_tree/:location_number')
  removeNestedNodesByPath(@Param('location_number') location_number: string) {
    return this.locationService.removeNestedNodesByPath(location_number);
  }
}
