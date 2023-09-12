import { Entity, BaseEntity ,PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity({name: "user", schema: "public", synchronize: true})
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    age!: number;

    // @Column({
    //     unique: true
    // })
    // email!: string;

    // @Column({
    //     default: true,
    //     name: "active"
    // })
    // is_active!: boolean;

    // @Column(
    //     {default: 0,
    //     type: "numeric"}
    // )
    // no_of_books_issued:number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


}
