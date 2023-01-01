export async function bookTrip(tripId:number , userId:number , email : string , name : string, img: string , adate : string , ddate : string , price:number , seat? : number ){
    try{
    let fetching = await fetch(`${process.env.REACT_APP_API_LINK}/booking/book_trip.php`,{
    method : "POST",
    body :JSON.stringify({
        userId : userId,
        email  : email,
        tripId : tripId,
        name   : name,
        img    : img ,
        adate  : adate,
        ddate  : ddate,
        price  : price,
        seat   : (seat&&seat) || null
        })
        });
        let res = await fetching.text();
        let data = res;
        return data;
    }catch{
        alert('Server Error , SORRY!')
    }
}



export let deleteBooking = async (id:number)=>{
    let req = await fetch(`${process.env.REACT_APP_API_LINK}/booking/delete_booking.php` , {method : 'POST' , body : JSON.stringify({id : id})});
    let res = await req.json();
    return res;
}

