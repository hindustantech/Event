import { Document, Schema, model, models } from "mongoose";
export interface IEvent extends Document{
    _id:String;
    title: string;
    description?: string;
    location?: string;
    createdAt: string;
    imageUrl: string;
    startDateTime: string;
    endDateTime: string;
    price?: string;
    isFree: boolean;
    url?: string;
    category: {_id:String,name:String};
    Organier:{_id:String,firstName:String,lastName:String};
}


const EventSchema=new Schema({
    title:{type:String,require:true},
    description:{type:String},
    location:{type:String},
    createdAt:{type:String, default:Date.now},
    imageUrl:{type:String,required:true},
    startDateTime:{type:String,default:Date.now},
    endDateTime:{type:String,default:Date.now},
    price:{type:String},
    isFree:{type:Boolean,default:false},
    url:{type:String},
    category:{type:Schema.Types.ObjectId,ref:'Category'},
    Organier:{type:Schema.Types.ObjectId,ref:'User'},

    
})

const Event = models.Event || model('Event', EventSchema);

export default Event;