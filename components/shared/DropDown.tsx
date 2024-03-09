import { DropDownProps } from "@/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

import { startTransition, useEffect, useState } from "react"
import { ICategory } from "@/database/models/category.model"
import { Input } from "../ui/input"
import { createCategory, getCategories } from "@/lib/actions/category.action"

const DropDown = ({ value, onChangeHandler }: DropDownProps) => {
  const [newCategory, setNewCategory] = useState("")
  const [categories, setCategories] = useState<ICategory[]>([])
  const handelAddCategory = () => {
    createCategory({ categoryName: newCategory.trim() })
      .then((category) => {
        setCategories((prevState) => {
          return [...prevState, category]
        })
      })
      .catch((Error) => {
        console.error(Error)
      })
  }

  useEffect(() => {
    const getAllCategories = async () => {
      const categoryList = await getCategories()
      categoryList && setCategories(categoryList as ICategory[])
    }
    getAllCategories()
  }, [])
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}
        {/* add new category */}
        <AlertDialog>
          <AlertDialogTrigger className=" p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>new category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  onChange={(e) => setNewCategory(e.target.value)}
                  className=" input-field mt-3"
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => startTransition(handelAddCategory)}
              >
                Add
              </AlertDialogAction>
              <AlertDialogCancel className="bg-red-500 text-white hover:bg-red-500 hover:bg-opacity-90 hover:text-white">
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  )
}

export default DropDown
