export interface CartProduct
{
    count:string;
    _id:string;
    price:string;
    product:Product;
}
export interface Category
{
    _id?:string;
    name:string;
    slug?:string;
    image:string;
}
export interface Product {
    sold?:            number;
    images?:          string[];
    subcategory?:     Brand[];
    ratingsQuantity?: number;
    _id?:             string;
    title:           string;
    slug?:            string;
    description?:     string;
    quantity?:        number;
    price?:           number;
    imageCover?:      string;
    category?:        Brand;
    brand?:           Brand;
    ratingsAverage:  number;
    createdAt?:       Date;
    updatedAt?:       Date;
    id?:              string;
}

export interface Brand {
    _id?:       string;
    name?:      string;
    slug?:      string;
    image?:    string;
    category?: string;
}
