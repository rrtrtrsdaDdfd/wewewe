import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn({name:'product_id'})
    id: number
    @Column()
    name: string
   @CreateDateColumn()
   createdAT: Date
   @UpdateDateColumn()
   updatedATA: Date
   @ManyToOne(()=>User,(user)=>user.products)
   @JoinColumn({name: 'user_id'})
   user:User
}
