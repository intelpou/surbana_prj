import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, TreeRepository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);

  /**
   * We have used data mapper approach for injecting repository here.
   * @param locationRepository 
   */
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: TreeRepository<Location>,
  ) {}

  /**
   * This action adds a new location.
   * @param createLocationDto 
   * @returns save result
   */
  create(createLocationDto: CreateLocationDto): Promise<Location> {
    const data = this.locationRepository.create(createLocationDto);
    this.logger.log('Adding a new location');
    return this.locationRepository.save(data);
  }

  /**
   * This action returns all location.
   * @returns Location[]
   */
  findAll(): Promise<Location[]> {
    this.logger.log('Finding all location');
    return this.locationRepository.find();
  }

  /**
   * This action returns all nested nodes by the path of a location.
   * @returns Location[]
   */
  async findNestedNodesByPath(location_number: string): Promise<Location[]> {
    this.logger.log('Finding nested nodes by a location');
    const location = await this.findOne(location_number);
    if (!location) {
      const msg = 'Resource not found';
      this.logger.error(msg);
      throw new NotFoundException(msg);
    }
    // const data = this.locationRepository.findDescendants(location);
    const data = this.locationRepository.query(
      'SELECT * FROM location WHERE path <@ $1',
      [location.path]
    );
    if (!data) {
      const msg = 'Resource not found';
      this.logger.error(msg);
      throw new NotFoundException(msg);
    }
    return data;
  }

  /**
   * This action returns a #${location_number} location
   * @param location_number 
   * @returns a location
   */
  findOne(location_number: string): Promise<Location> {
    this.logger.log('Finding a location');
    const data = this.locationRepository.findOneBy({ location_number });
    if (!data) {
      const msg = 'Resource not found';
      this.logger.error(msg);
      throw new NotFoundException(msg);
    }
    return data;
  }

  /**
   * This action updates a #${location_number} location
   * @param location_number 
   * @param updateLocationDto 
   * @returns save result
   */
  async update(location_number: string, updateLocationDto: UpdateLocationDto): Promise<Location> {
    const existedLocation = await this.findOne(location_number);
    const data = this.locationRepository.merge(existedLocation, updateLocationDto);
    this.logger.log('Updating a location');
    return this.locationRepository.save(data);
  }

  /**
   * This action removes a #${location_number} location
   * @param location_number 
   * @returns delete result
   */
  remove(location_number: string): Promise<DeleteResult> {
    this.logger.log('Removing a location');
    return this.locationRepository.delete(location_number);
  }

  /**
   * This action removes a #${location_number} location
   * @param location_number 
   * @returns delete result
   */
  async removeNestedNodesByPath(location_number: string): Promise<DeleteResult> {
    this.logger.log('Removing a location');
    const location = await this.findOne(location_number);
    if (!location) {
      const msg = 'Resource not found';
      this.logger.error(msg);
      throw new NotFoundException(msg);
    }
    // const data = this.locationRepository.findDescendants(location);
    const data = this.locationRepository.query(
      'DELETE FROM location WHERE path <@ $1',
      [location.path]
    );
    if (!data) {
      const msg = 'Resource not found';
      this.logger.error(msg);
      throw new NotFoundException(msg);
    }
    return data;
  }
}
