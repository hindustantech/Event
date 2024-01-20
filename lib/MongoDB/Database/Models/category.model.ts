import { Document, model, models, Schema } from "mongoose";


export interface ICategory extends Document {
    _id: String;
    name: String;
}

const CategorySchema = new Schema({
    name: { type: String, require: true, unique: true }

})

const Category = models.Category || model('Category', CategorySchema)