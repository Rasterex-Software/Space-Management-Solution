import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { IsOptional, IsString, MaxLength, IsNotEmpty, IsEmail } from 'class-validator';
import { CrudValidate } from '@nestjsx/crud';
import { BaseEntity } from 'base-entity';
import { Country } from 'countries/country.entity';
import { Building } from 'buildings/building.entity';

const { CREATE, UPDATE } = CrudValidate;

@Entity('regions')
export class Region extends BaseEntity{

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @Column({ type: 'varchar', length: 100, nullable: false })
    label: string;

    @IsOptional({ always: true })
    @IsString({ always: true })
    @Column({ type: 'text', nullable: false, default: '' })
    description: string;

    @IsOptional({ groups: [UPDATE, CREATE] })
    @Column({ nullable: true })
    countryId: number;

    /**
    * Relations
    */

    @OneToMany( (type) => Building, (b) => b.region,  { nullable: true, cascade:true })
    buildings: Building[];

    @ManyToOne( (type)=> Country, (c) => c.regions, { nullable: true})
    country: Country;
}
