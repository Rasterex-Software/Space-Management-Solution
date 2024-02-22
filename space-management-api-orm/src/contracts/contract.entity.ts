import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { IsOptional, IsString, MaxLength, IsDate } from 'class-validator';
import { CrudValidate } from '@nestjsx/crud';
import { BaseEntity } from 'base-entity';
import { Area } from 'areas/area.entity';
import { Tenant } from 'tenants/tenant.entity';

const { CREATE, UPDATE } = CrudValidate;

@Entity('contracts')
export class Contract extends BaseEntity{

    @IsOptional({ always: true })
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @Column({ type: 'varchar', length: 100, nullable: false, default:''})
    label: string;

    @IsOptional({ always: true })
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @Column({ type: 'varchar', length: 100, nullable: false, default:''})
    type: string;

    @IsOptional({ always: true })
    @IsString({ always: true })
    @Column({ type: 'text', nullable: false, default: '' })
    description: string;

    @IsOptional({  groups: [UPDATE, CREATE] })
    // @IsDateString()
    @IsDate()
    @Column({ nullable: true })
    startDate: Date;

    @IsOptional({  groups: [UPDATE, CREATE] })
    // @IsDateString()
    @IsDate()
    @Column({ nullable: true })
    endDate: Date;

    /**
    * Relations
    */

    @OneToMany( (type) => Area, (a) => a.contract,  { nullable: true })
    areas: Area[];

    // TODO review/consider removing this
    @ManyToOne( (type) => Tenant, (t) => t.contracts,  { nullable: true })
    @JoinColumn({ name: "tenantId" })
    tenant: Tenant;

}
