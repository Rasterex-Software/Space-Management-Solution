import { Entity, Column, OneToMany } from 'typeorm';
import { IsOptional, IsString, MaxLength, IsNotEmpty, IsEmail } from 'class-validator';
import { CrudValidate } from '@nestjsx/crud';
import { BaseEntity } from 'base-entity';
import { Region } from 'regions/region.entity';

const { CREATE, UPDATE } = CrudValidate;

@Entity('countries')
export class Country extends BaseEntity{

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

    /**
    * Relations
    */

    @OneToMany( (type) => Region, (r) => r.country,  { nullable: true, cascade:true })
    regions: Region[];

}
