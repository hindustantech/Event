"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EventFromvalidat } from "@/lib/validator"
import { eventDefaultValues } from "@/constants"
import DropDown from "./DropDown"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUpload"
import { useState } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox"
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"

type EventFromPops = {
  userId: string,
  type: 'Create' | 'Update',
  event?: IEvent,
  eventId?: string,
}
const EventFrom = ({ userId, type, event, eventId }: EventFromPops) => {
  const initialValue = event && type === 'Update' ?
    {
      ...event,
      startDateTime:new Date(event.startDateTime),
      endDateTime:new Date(event.endDateTime)
    
    }
    : eventDefaultValues;
  const [files, setFiles] = useState<File[]>([])
  const [startDate, setStartDate] = useState(new Date());
  const { startUpload } = useUploadThing('imageUploader');
  const router = useRouter();

  const form = useForm<z.infer<typeof EventFromvalidat>>({
    resolver: zodResolver(EventFromvalidat),
    defaultValues: initialValue
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EventFromvalidat>) {
    let uploadedImageUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files)

      if (!uploadedImages) {
        return
      }
      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: '/profile'
        })
        if (newEvent) {
          form.reset();
          router.push(`/event/${newEvent._id}`)
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (type === 'Update') {
      if(!eventId){
        router.back();
        return;
      }
      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl,_id:eventId },
          path: `event/${eventId}`
        })
        if (updatedEvent) {
          form.reset();
          router.push(`/event/${updatedEvent._id}`)
        }
      } catch (error) {
        console.log(error)
      }
    }

  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Event Title" {...field} className="p-regular-16 border-0 bg-gray-300 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <DropDown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea placeholder="Event Description" {...field} className=" p-regular-16 border-0 bg-gray-300 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden  rounded-full bg-gray-300 px-4 py-2">
                    <Image
                      src="/assets/icons/location-grey.svg"
                      alt="location"
                      width={24}
                      height={24}
                      className="filter-gray"
                    />
                    <Input placeholder="Event location" {...field} className=" p-regular-16 border-0 bg-gray-300 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 " />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden  rounded-full bg-gray-300 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calander"
                      width={24}
                      height={24}
                      className="filter-gray"
                    />
                    <p className="ml-3 whitespace-nowrap text-gray-600 "> Start Date: </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time"
                      dateFormat="MM/dd/yyyy h:mm a"
                      wrapperClassName="datePicker"
                      className="bg-gray-300"

                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden  rounded-full bg-gray-300 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calander"
                      width={24}
                      height={24}
                      className="filter-gray"
                    />
                    <p className="ml-3 whitespace-nowrap text-gray-600 "> End Date: </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time"
                      dateFormat="MM/dd/yyyy h:mm a"
                      wrapperClassName="datePicker"
                      className="bg-gray-300"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden  rounded-full bg-gray-300 px-4 py-2">
                    <Image
                      src="/assets/icons/dollar.svg"
                      alt="dollar"
                      width={24}
                      height={24}
                      className="filter-gray"
                    />
                    <Input type="number" placeholder="Price" {...field} className="p-regular-16 border-0 bg-gray-300 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem >
                          <FormControl>
                            <div className="flex items-center">
                              <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket </label>
                              <Checkbox onCheckedChange={field.onChange} checked={field.value} id="isFree" className="mr-3 h-5 w-5 border-2 border-primary-500" />

                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden  rounded-full bg-gray-300 px-4 py-2">
                    <Image
                      src="/assets/icons/link.svg"
                      alt="URL"
                      width={24}
                      height={24}
                      className="filter-gray"
                    />
                    <Input placeholder="Event URL" {...field} className=" p-regular-16 border-0 bg-gray-300 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 " />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? ('submitting...') : `${type} Event`}
        </Button>
      </form>
    </Form>
  )

}
export default EventFrom;