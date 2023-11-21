"use server"
import { ImageType } from "@/types"
import cloudinary from "cloudinary"
import fs from "fs/promises"
import {v4 as uuidv4} from "uuid"
import path, { resolve } from "path"
import os from "os"
import prismadb from "../lib/prisma"
import { string } from "zod"
import { url } from "inspector"

//1 initialing the cludinary 
//2-


cloudinary.v2.config({
    cloud_name:"di94yntgq",
api_key:"441623691444635",
api_secret:"phC2IQPVF2R8J59iFIYnYjgtSwU",
allowedFormats: ["jpg", "png", "pdf",],

})


export async function SavePhotosTolocale(formData:FormData){
    const files=formData.getAll("files")
    const multiBuffer=files.map(file=>(
      //@ts-ignore
        file.arrayBuffer().then(data=>{
            const buffer=Buffer.from(data)
            const name=uuidv4()
                  //@ts-ignore

            const ext=file.type.split("/")[1] 


            const tempdir=os.tmpdir()
                  //@ts-ignore

            const uploadTodir=path.join( tempdir ,`/${file.name}.${ext}`)
            fs.writeFile(uploadTodir,buffer)
                  //@ts-ignore

            return{filepath:uploadTodir,filename:file.name}
        })
    ))


   return await Promise.all(multiBuffer)



   }
   interface ObjectOne{
    url:string
    folder:string
   }
 async function uploadTocloudinary(newFiles:string[] | ObjectOne[] ){
    const multiplePhotosPropmise=newFiles.map(file=> (  
            //@ts-ignore

        cloudinary.v2.uploader.upload(file.filepath as string,{folder:"mohamed"})


    ))
    return await Promise.all(multiplePhotosPropmise)

 }
 const delay=(dalayIns:number)=>{
  return new Promise(resolve=>setTimeout(resolve,dalayIns))
 }



 async function creatProducts(allphotos:string[]){
        //@ts-ignore

 const mapped= allphotos.map((photo:string)=>photo.url)
 console.log(mapped)
  
 
  try {
    const newPhoto= await prismadb.product.create({
      data:{
        name:"catmohs",
        
        
        images: {
          createMany: {
            data: [
              {url:mapped[0]},
               
          
            ],
     
         
          },
      }
      }
    })
    
  } catch (error) {
    
  }
}
export async function uloadPhoto(formData:FormData){
 try{
    const newFiles=await SavePhotosTolocale(formData)
    console.log("newfile si shere",newFiles)


    const allphotos=await  uploadTocloudinary(newFiles)
    console.log("photos",allphotos)
          //@ts-ignore

    newFiles.map(file=>fs.unlink(file.filepath))
    await delay(3000)


    const createdProduct=await creatProducts(allphotos as any)

  
 
   




 
  
      
      
      
 
    
 
}
catch{
  return{errMsg:"faled to upload sorry"}
}



}
