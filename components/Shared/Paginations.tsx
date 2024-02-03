"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { formUrlQuery } from '@/lib/utils'
type PaginationProp={
  page:number|string,
  totalPages:number,
  urlParamName?:string
}
const Paginations = ({page ,totalPages, urlParamName}:PaginationProp) => {
  const router=useRouter()
  const searchParams=useSearchParams()
  const onClick=(btnType:string)=>{
    const Pagevale=btnType==='next'?Number(page)+1:Number(page)-1
    const newUrl=formUrlQuery({
      params:searchParams.toString(),
      key:urlParamName||'page',
      value:Pagevale.toString()
    })
    router.push(newUrl,{scroll:false})
  }

  return (
    <div className='flex gap-2'>
      <Button 
        size='lg'
        variant="outline"
        className='w-28'
        onClick={()=>onClick('prev')}
        disabled={Number(page)<=1}
        >
        previous
      </Button>

      <Button 
        size='lg'
        variant="outline"
        className='w-28'
        onClick={()=>onClick('next')}
        disabled={Number(page)<=1}
        >
       Next
      </Button>
    </div>
  )
}

export default Paginations