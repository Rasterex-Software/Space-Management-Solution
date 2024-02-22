import { Entity, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { IsOptional, IsString, MaxLength, IsNotEmpty, IsEmail } from 'class-validator';
import { CrudValidate } from '@nestjsx/crud';
import { BaseEntity } from 'base-entity';
// import { Area } from 'areas/area.entity';
import { Building } from 'buildings/building.entity';
import { File } from 'files/file.entity';

const { CREATE, UPDATE } = CrudValidate;

@Entity('floors')
export class Floor extends BaseEntity{

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

    @IsOptional({ always: true })
    @IsString({ always: true })
    @Column({ nullable: true, unique: true  })
    floorFile: string;

    @IsOptional({ groups: [UPDATE, CREATE] })
    @Column({ nullable: true })
    buildingId: number;

    /**
    * Relations
    */

    // @OneToMany( (type) => Area, (a) => a.floor,  { nullable: true })
    // areas: Area[];

    @ManyToOne( (type)=> Building, (b) => b.floors, { nullable: true})
    building: Building;

    @OneToOne( (type)=> File, (f) => f.floor, { nullable: true})
    @JoinColumn()
    file: File;

}
