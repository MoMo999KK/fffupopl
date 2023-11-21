"use client"
import {useRef,useState} from "react"
import { PhotoCard } from "./photocard"
import { ImageType } from "@/types"
import { SavePhotosTolocale, uloadPhoto } from "../actions/upload"



export const FileUpload = () => {
    const formref=useRef() as any
    const [files,setFiles]=useState<ImageType[] | []>([])
    console.log(files)


    async function handelFileUpload(e:any){
        const files=e.target.files
        const newfies=[...files].filter(file=>{
       if(file.size< 1024*1024 ){
        return file
        console.log(file)
        console.log(newfies)
       }
        })
        setFiles(prev=> [...newfies, ...prev])

    }


async function handeleRemove(index:number){

  const deletedFles=files.filter((_,i)=>i !==index)
  setFiles(deletedFles)
}


async function handelUploadToCLoudnary() {
  if(!files.length) alert("please select a file")
  const formData=new FormData()
  formData.get("name") 
files.forEach(file=>{
  formData.append("files",file as any)

})
const res=await uloadPhoto(formData)
  

  
}
  
  return (
 <div>
      <form action={handelUploadToCLoudnary} ref={formref}>
        <h1>file upload here please</h1>

        <div className="">

            <input type="file" name="file"  multiple  placeholder="upload" onChange={handelFileUpload}/>
            <input type="text" name="name" />
            </div>
            <button type="submit">add</button>
        </form>

        <div className="">{files.map((file,index)=>(

       <PhotoCard key={index} url={URL.createObjectURL(file as any)}   deleteThis={()=>handeleRemove(index)}/>



 
        ))}</div>
 </div>  
   )
}

 