import { Blob } from "buffer";

export interface ImageType{
    name:string;
    lastModifiedDate:Date;
    size:number;
    lastModified:number;
    type:string;
    blobValue?: Blob
    filename?: string | undefined;
    filepath?:string
  
  
  }