import { ImageType } from "@/types"
import Image from "next/image"
interface Props{
    url:any;
    deleteThis:any;
  
 }


export const PhotoCard=({url,deleteThis}:Props )=>{
    

     return(
        <div className="">
            <p>{url}</p>
            <Image src={url} height={100} width={100} alt="h"/>


            <div className="">
                <button onClick={deleteThis }>dlete</button>

             </div>
        </div>
    )
}