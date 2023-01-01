/* eslint-disable @typescript-eslint/no-unused-vars */
/* reservation and user interfaces */
export interface bookingInterface{
    adate       : string,
    ddate       : string,
    email       : string,
    id          : number,
    price       : number,
    ship_place  : number,
    trip_id     : number,
    trip_title  : string,
    img         : string,
    user_id     : number
}
export interface trip {
    adate: string,
    airLine: string,
    atime: string,
    ddate: string,
    description: string,
    dfrom: string,
    dtime: string,
    img: string,
    name: string,
    price: number,
    rowId: number,
    secondaryImg: string,
    star: number,
    tableId: string,
    ticketsAvailable: number,
    tripType: string
}

export interface surBooking{
    rowId:number , name :string, img:string , adate:string , ddate:string ,price:number , reservedSeat?:number
}