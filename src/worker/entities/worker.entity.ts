import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Worker {
    @PrimaryColumn({name:'worker_id'})
    id: number
    @Column()
    name: string
    @Column()
    numberOfClients: number
    @Column({nullable: true})
    typeProduct: string
    @CreateDateColumn()
    createdAT: Date
    @UpdateDateColumn()
    updatedATA: Date

    @OneToMany(()=> User,(user)=>user.worker)
    user: User[]
    


}
