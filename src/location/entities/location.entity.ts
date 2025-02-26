import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Location {
  @PrimaryColumn({ type: 'varchar' })
  location_number: string;

  @Column({ type: 'varchar', length: 5 })
	building: string;

  @Column({ type: 'varchar' })
	location_name: string;

  @Column({ type: 'int' })
	area: number;

  @Column({ type: 'varchar' })
	path: string;
}
