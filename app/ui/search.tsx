'use client';
 
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
 
export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [currentQuery,setQuery]=useState("")

 
  function handleSearch(term: string) {
    console.log(`Searching... ${term}`);
   
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
      setQuery(term)
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }


  useEffect(()=>{
    

  },[currentQuery])




  return(
    <>
    <input
  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
  
  onChange={(e) => {
    handleSearch(e.target.value);
  }}
  defaultValue={searchParams.get('query')?.toString()}
/>

<p>and this is our query:{currentQuery}</p>

</>
  )
}