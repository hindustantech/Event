import React, { startTransition, useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ICategory } from '@/lib/database/models/category.model'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '../ui/input'
import { CreateCategory, getAllCategory } from '@/lib/actions/category.action'

type DropDownProps = {
    value?: string,  // Change the type here to primitive string
    onChangeHandler?: () => void
}
const DropDown = ({ value, onChangeHandler }: DropDownProps) => {
    const [categories, setCategories] = useState<ICategory[]>([])
  const [newcategory, setNewCategory] = useState<string>('');

    const handleAddcategory = () => {
        CreateCategory({
            categoryName: newcategory.trim()
        })
            .then((category) => {
                setCategories((prevState) => [...prevState, category])
            })
    }

    useEffect(() => {
        const getcategories = async () => {
            const categoriesList = await getAllCategory();
            categoriesList && setCategories(categoriesList as ICategory[])
        }
        getcategories();
    }, [])
    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="category" />
            </SelectTrigger>
            <SelectContent>
                {categories.length > 0 && categories.map((category) => (
                    <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">
                        {category.name}
                    </SelectItem>
                ))}
                <AlertDialog>
                    <AlertDialogTrigger className='p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500'>Add New Category</AlertDialogTrigger>
                    <AlertDialogContent className='bg-white'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>New Category </AlertDialogTitle>
                            <AlertDialogDescription>
                                <Input type='text' placeholder='Category Name ' className='p-regular-16 border-0 bg-gray-300 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 mt-3' onChange={(e) => { setNewCategory(e.target.value) }} />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => { startTransition(handleAddcategory) }}> Add</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </SelectContent>
        </Select>
    )
}

export default DropDown

function category(value: any) {
    throw new Error('Function not implemented.')
}
