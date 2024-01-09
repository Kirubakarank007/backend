import {Entity,Column,PrimaryGeneratedColumn,AfterInsert,AfterRemove,AfterUpdate} from 'typeorm'


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    password:string;
    static id: any;

    @AfterInsert()
    logInsert(){
        console.log('inserted id is :',this.id);
    }

    @AfterUpdate()
    logupdate(){
        console.log("updated with id :",this.id);
    }

    @AfterRemove()
    logRemove(){
        console.log('this id is removed :',this.id);
    }
}