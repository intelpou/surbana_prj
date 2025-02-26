import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':location_number')
  findOne(@Param('location_number') location_number: string) {
    return this.locationService.findOne(location_number);
  }

  @Patch(':location_number')
  update(@Param('location_number') location_number: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(location_number, updateLocationDto);
  }

  @Delete(':location_number')
  remove(@Param('location_number') location_number: string) {
    return this.locationService.remove(location_number);
  }
}
