import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
    Entity, Column, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { IsOptional, IsString, IsNotEmpty, IsNumber, IsEnum, IsBoolean } from 'class-validator';
import { CrudValidate } from '@nestjsx/crud';

import { Floor } from 'floors/floor.entity';
// import { Tenant } from 'tenants/tenant.entity';
// import { Contract } from 'contracts/contract.entity';

const { CREATE, UPDATE } = CrudValidate;

@Entity('files')
export class File {

    // @PrimaryColumn('name')
    // @IsString()
    // name: string;
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @Column({type: 'varchar', nullable: false, unique: true})
    name: string;

    @IsOptional({ groups: [UPDATE] })
    @IsBoolean()
    @Column({ type: 'boolean', default: false })
    isPrepared: boolean = false;

    @IsOptional({ groups: [UPDATE, CREATE] })
    @IsString({ always: true })
    @Column({ type: 'text', nullable: false, default: '' })
    hierarchyPath: string;

    @IsOptional({ groups: [UPDATE, CREATE] })
    @IsString({ always: true })
    @Column({ type: 'text', nullable: false, default: '' })
    layerState: string;

    @IsOptional({ groups: [UPDATE, CREATE] })
    @IsString({ always: true })
    @Column({ type: 'text', nullable: false, default: '' })
    rotationState: string;

    @CreateDateColumn({ nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;

    /**
    * Relations
    */

    // ...
    @OneToOne( (type)=> Floor, (f) => f.file, { nullable: true})
    floor: Floor;

}