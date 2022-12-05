export interface StuffResource{
    name: string,
    categoryId: number,
    price: number
    imgSource: string
}

export interface UpdateBody{
    id: number,
    bodyResource: StuffResource
}