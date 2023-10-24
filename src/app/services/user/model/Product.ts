import { Photo } from "./Photo";

export class Product{

    id!:number;

    name!:string;

    description!:string ;

    price!:number;

    brandId!:number;

    brandName!:string;

    brandPhoto!:string;

    created_at!: string;

    photos!:Photo[];
    

  
}