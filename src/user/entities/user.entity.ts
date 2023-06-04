import { Product } from "src/product/entities/product.entity";
import { Worker } from "src/worker/entities/worker.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class User {
   @PrimaryGeneratedColumn()
   id: number
   @Column()
   email: string
   @Column()
   password: string
   @CreateDateColumn()
   createdAT: Date
   @UpdateDateColumn()
   updatedATA: Date
   @OneToMany(()=>Product, (product)=>product.user,{onDelete: 'CASCADE'})
   products: Product[]

   @ManyToOne(()=>Worker,(worker)=>worker.user,{onDelete: 'CASCADE'})
   @JoinColumn({name:'worker_id'})
   worker: Worker

}
