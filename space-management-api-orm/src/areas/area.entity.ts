import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
    Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { IsOptional, IsString, MaxLength, IsNotEmpty, IsNumber, IsEnum, IsUUID } from 'class-validator';
import { CrudValidate } from '@nestjsx/crud';

// import { Floor } from 'floors/floor.entity';
import { Tenant } from 'tenants/tenant.entity';
import { Contract } from 'contracts/contract.entity';

const { CREATE, UPDATE } = CrudValidate;

@Entity('areas')
export class Area {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string;

    @IsOptional({ groups: [UPDATE] })
    @IsString({ always: true })
    @Column({ nullable: false })
    floorFile: string;

    @IsOptional({ groups: [UPDATE, CREATE] })
    @Column({ nullable: true })
    tenantId: number;

    @CreateDateColumn({ nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;

    /**
    * Relations
    */

    @ManyToOne((type) => Tenant, (t) => t.areas,  { nullable: true })
    tenant: Tenant;

    @ManyToOne((type) => Contract, (c) => c.areas,  { nullable: true })
    @JoinColumn({ name: "contractId" })
    contract: Contract;

    // @ManyToOne((type) => Floor, (f) => f.areas,  { nullable: true })
    // floor: Floor;

}