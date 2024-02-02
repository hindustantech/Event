import * as z from "zod"

 export const EventFromvalidat = z.object({
    title:z.string().min(3,'Title Must should be 3 charater'),
    description: z.string().min(3,'Charater Must be 3 ').max(400,'Max Charater  should be 400'),
    location:z.string().min(3,'Charater Must be 3 ').max(400,'Max Charater  should be 400'),              
    imageUrl:z.string().url(),
    startDateTime:z.date(),
    endDateTime:z.date(),
    price:z.string(),
    isFree:z.boolean(),
    url:z.string().url(),
    categoryId:z.string(),
  })