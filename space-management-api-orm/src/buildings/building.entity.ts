import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { IsOptional, IsString, MaxLength, IsNotEmpty, IsEmail } from 'class-validator';
import { CrudValidate } from '@nestjsx/crud';
import { BaseEntity } from 'base-entity';
import { Floor } from 'floors/floor.entity';
import { Region } from 'regions/region.entity';

const { CREATE, UPDATE } = CrudValidate;

@Entity('buildings')
export class Building extends BaseEntity{

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
    regionId: number;

    /**
    * Relations
    */

    @OneToMany( (type) => Floor, (f) => f.building,  { nullable: true, cascade:true })
    floors: Floor[];

    @ManyToOne( (type)=> Region, (r) => r.buildings, { nullable: true})
    region: Region;
}
