import { Entity , PrimaryGeneratedColumn , Column , ManyToOne } from "typeorm";
import {User} from '../users/user.entity';

@Entity('tasks')
export class Task{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title : string;

    @Column({nullable : true})
    description : string;

    @Column({default : false})
    completed : boolean;

    @ManyToOne(() => User , {nullable : false , onDelete : 'CASCADE'})
    owner : User;
}