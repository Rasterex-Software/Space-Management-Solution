import { Entity, Column, OneToMany } from 'typeorm';
import { IsOptional, IsString, MaxLength, IsNotEmpty, IsEmail } from 'class-validator';
import { CrudValidate } from '@nestjsx/crud';
import { BaseEntity } from 'base-entity';
import { Area } from 'areas/area.entity';
import { Contract } from 'contracts/contract.entity';

const { CREATE, UPDATE } = CrudValidate;

@Entity('tenants')
export class Tenant extends BaseEntity{

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @Column({ type: 'varchar', length: 100, nullable: false })
    label: string;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @Column({ type: 'varchar', length: 100, nullable: false })
    firstName: string;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @Column({ type: 'varchar', length: 100, nullable: false })
    lastName: string;

    @IsOptional({ always: true })
    @IsString({ always: true })
    @Column({ type: 'text', nullable: false, default: '' })
    description: string;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(20, { always: true })
    @Column({ type: 'varchar', length: 20, nullable: false })
    phone: string;

    @IsOptional({  groups: [UPDATE]  })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({  groups: [UPDATE, CREATE] })
    @MaxLength(255, { groups: [UPDATE, CREATE] })
    @IsEmail({ require_tld: false }, { groups: [UPDATE, CREATE] })
    @Column({ type: 'varchar', length: 255, nullable: false, unique: false })
    email: string;

    @IsOptional({  groups: [UPDATE]  })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({  groups: [UPDATE, CREATE] })
    @MaxLength(30, { groups: [UPDATE, CREATE] })
    @Column({ type: 'varchar', length: 30, nullable: false, unique: false, default: 'rgba(150,150,150,0.5)' })
    color: string;

    /**
    * Relations
    */

    @OneToMany( (type) => Area, (a) => a.tenant,  { nullable: true })
    areas: Area[]

    @OneToMany( (type) => Contract, (c) => c.tenant,  { nullable: true })
    contracts: Contract[];

}
