import { 
    Collection,
} from 'fireorm';
import moment from 'moment';
import { IsEmail } from 'class-validator';

export type Metadata = {
    createDate : Date;
    modifyDate : Date;
}

@Collection('userArchive')
export class UserArchive{
    constructor(
        id : string='',
        metadata : Metadata={
            createDate : moment().toDate(),
            modifyDate : moment().toDate(),
        },
    ){
        this.id = id;
        this.metadata = metadata;
    }

    id : string;
    metadata : Metadata;

    @IsEmail()
    email : string;
    emailVerified : boolean;
    displayName : string;

}