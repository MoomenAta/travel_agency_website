import React, { SetStateAction,useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { trip } from '../interfaces';
import styles from '../styles/addProducts.module.css'
type addProductProps = {
    openAddProduct: boolean,
    setOpenAddProduct: React.Dispatch<SetStateAction<boolean>>
}
export default function AddProduct({openAddProduct , setOpenAddProduct} : addProductProps) {
    let [mainImg , setMainImg] = useState<string>('');
    let [subImgs , setSubImgs] = useState<string[]>([]);
    let mainContainer = useRef<HTMLDivElement>(null);
    const closeModal = (e:Event)=>{
        
        if( mainContainer.current && !mainContainer.current?.contains(e.target as HTMLElement)){
            setOpenAddProduct(!openAddProduct)
        }
    }
    
    useEffect(()=>{
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            (document.querySelector('[data-maincontainer]') as HTMLElement).style.opacity = '1';
        }, 0);
        
        document.addEventListener('click', closeModal , { capture: true });
        return()=>{
            document.body.style.overflow = 'auto';
        }
    })
    function updateMainImg(e:React.ChangeEvent<HTMLInputElement>){
        const fileList = e.target.files;
        if(fileList)
        {
            const fd = new FormData();
            fd.append('img',fileList[0])
            if(mainImg){
                fetch(`${process.env.REACT_APP_API_LINK}/upload/deleteImg.php`, {
                    method: "POST", 
                    body: JSON.stringify({
                        toDelete : mainImg 
                    })
                })
            }
            fetch(`${process.env.REACT_APP_API_LINK}/upload/uploadImage.php`, {
                method: "POST", 
                body: fd
            }).then((res)=>{
                return (res.json())
            }).then((data)=>setMainImg(data.imgSrc));
        }
    }
    function updateSubImgs(e:React.ChangeEvent<HTMLInputElement>){
        const fieldSet = e.target.files;
        if(fieldSet){
            console.log(fieldSet)
            let fd = new FormData();
            fd.append('img',fieldSet[0])
            fetch(`${process.env.REACT_APP_API_LINK}/upload/uploadImage.php`, {
                method: "POST", 
                body: fd
            }).then((res)=>res.json()).then((data)=>setSubImgs([...subImgs , data.imgSrc]));
        }
    }
    function removeImg(i:number){
        fetch(`${process.env.REACT_APP_API_LINK}/upload/deleteImg.php`, {
            method: "POST", 
            body: JSON.stringify({
                toDelete : subImgs[i] 
            })
        })
        setSubImgs(subImgs.filter((string , index) => index !== i ))
    }

    function addAlert(name : string , message : string){
        if( name === 'subImgs' || name === 'mainImg' ){
            (document.querySelector(`#${name}`) as HTMLDivElement).style.border = '1px dashed red';
        }else{
            let labelElement = document.querySelector(`#${name}`) as HTMLLabelElement;
            if(!labelElement.querySelector('span')){
            let alertSpan = document.createElement('span');
            alertSpan.setAttribute('class' , 'alert');
            alertSpan.textContent = `${message}`;
            labelElement?.appendChild(alertSpan);
            }
        }
    }

    let checkTripDetails = (objName : object) => {
        let values = Object.values(objName);
        for(let i =0 ; i < values.length ; i++){
        if(values[i]) return true;
        return false
    }}

    function addTrip(){
        (document.querySelectorAll('.alert') as NodeListOf<HTMLSpanElement>).forEach((span)=>{
            span.parentNode?.removeChild(span);
        });
        (document.querySelector(`#subImgs`) as HTMLDivElement).style.border = '1px dashed rgba(189, 189, 189, 0.445)';
        (document.querySelector(`#mainImg`) as HTMLDivElement).style.border = '1px dashed rgba(189, 189, 189, 0.445)';
        let tripDetailsTemp : trip = {
            adate: '',
            airLine: '',
            atime: '',
            ddate: '',
            description: '',
            dfrom: '',
            dtime: '',
            img: '',
            name: '',
            price: 0,
            rowId: 0,
            secondaryImg: '',
            star: 0,
            tableId: '',
            ticketsAvailable: 0,
            tripType: ''
        };
        let title = document.querySelector('[data-title]') as HTMLInputElement;
        let description = document.querySelector('[data-description]') as HTMLTextAreaElement;
        let price = document.querySelector('[data-price]') as HTMLInputElement;
        let routename = document.querySelector('[data-routename]') as HTMLInputElement;
        let triptype = document.querySelector('[data-triptype]') as HTMLSelectElement;
        let adate = document.querySelector('[data-adate]') as HTMLInputElement;
        let ddate = document.querySelector('[data-ddate]') as HTMLInputElement;
        let atime = document.querySelector('[data-atime]') as HTMLInputElement;
        let dtime = document.querySelector('[data-dtime]') as HTMLInputElement;
        let ticketsavailable = document.querySelector('[data-ticketsavailable]') as HTMLInputElement;
        let airline = document.querySelector('[data-airline]') as HTMLInputElement;
        let departurefrom = document.querySelector('[data-departurefrom]') as HTMLInputElement;
        let starRate = document.querySelectorAll('.starIconHighlighted') as NodeListOf<HTMLSpanElement>;
        let currentDate = new Date().toISOString().split('T')[0];
        if(title.value.trim()){
            tripDetailsTemp.name = title.value.trim();
        }else{
            addAlert( 'title' , `invalid title`)
        }
        if(description.value.trim()){
            tripDetailsTemp.description = description.value.trim();
        }else{
            addAlert( 'description' , `invalid Description`)
        }
        if(price.value.trim()){
            tripDetailsTemp.price = +price.value.trim();
        }else{
            addAlert( 'price' , `invalid Price`)
        }
        if(routename.value.trim()){
            tripDetailsTemp.tableId = routename.value.trim().toLowerCase().replace(' ','_');
        }else{
            addAlert( 'routeName' , `invalid Route Name`)
        }
        if(triptype.value){
            tripDetailsTemp.tripType = triptype.value
        }else{
            addAlert( 'tripType' , `invalid trip type`)
        }
        if(new Date(adate.value).getTime() >= new Date(currentDate).getTime()){
            if(ddate.value && new Date(adate.value).getTime() <= new Date(ddate.value).getTime()){
                tripDetailsTemp.adate = adate.value;
            }
        }else{
            addAlert( 'arrivalDate' , `invalid Arrival Date`)
            adate.value = new Date().toDateString();
        }
        if(new Date(ddate.value).getTime() >= new Date(currentDate).getTime()){
            if(adate.value && new Date(adate.value).getTime() <= new Date(ddate.value).getTime()){
                tripDetailsTemp.ddate = ddate.value;
            }
        }else{
            addAlert( 'departureDate' , `invalid Departure Date`)
            ddate.value = new Date().toDateString();
        }
        if(atime.value.trim()){
            tripDetailsTemp.atime = atime.value.trim();
        }else{
            addAlert( 'arrivalTime' , `invalid Arrival Time`)
        }
        if(dtime.value.trim()){
            tripDetailsTemp.dtime = dtime.value.trim();
        }else{
            addAlert( 'departureTime' , `invalid Departure Time`)
        }
        if(ticketsavailable.value.trim()){
            tripDetailsTemp.ticketsAvailable = +ticketsavailable.value.trim();
        }else{
            addAlert( 'ticketsAvailable' , `invalid Tickets Available`)
        }
        if(airline.value.trim()){
            tripDetailsTemp.airLine = airline.value.trim();
        }else{
            addAlert( 'airLine' , `invalid Airline`)
        }
        if(departurefrom.value.trim()){
            tripDetailsTemp.dfrom = departurefrom.value.trim();
        }else{
            addAlert( 'departureFrom' , `invalid Location`)
        }
        if(mainImg){
            tripDetailsTemp.img = mainImg;
        }else{
            addAlert( 'mainImg' , `No Image`)
        }
        if(subImgs.length>0){
            tripDetailsTemp.secondaryImg = `${subImgs}`;
        }else{
            addAlert('subImgs', `No Images`)
        }
        if(starRate.length){
            tripDetailsTemp.star = starRate.length;
        }else{
            addAlert( 'tripRate' , `invalidRate`)
        }
        let request = { 
            method: 'Post',
            body: JSON.stringify(tripDetailsTemp) 
        };
        if(checkTripDetails(tripDetailsTemp)){
            fetch(`${process.env.REACT_APP_API_LINK}/routes/createRoute.php`,request).then((res)=>{
                if(res)
                setOpenAddProduct(false)
            })
        }
    }

    function closeModalButton(){
        if(mainImg){
            fetch(`${process.env.REACT_APP_API_LINK}/upload/deleteImg.php`, {
                method: "POST", 
                body: JSON.stringify({
                    toDelete : mainImg 
                })
            })
        }
        if(subImgs.length > 0){
            subImgs.forEach((img)=>{
                fetch(`${process.env.REACT_APP_API_LINK}/upload/deleteImg.php`, {
                    method: "POST", 
                    body: JSON.stringify({
                        toDelete : img
                    })
                })
            }) 
        }
        setOpenAddProduct(!openAddProduct)
    }
    useEffect(()=>{

        let starIcons = document.querySelectorAll('.starIconMask') as NodeListOf<HTMLSpanElement>;
        starIcons.forEach((icon,i) =>{
            icon.onclick = ()=>{
                for(let n = 0 ; n<=i ; n++){
                    starIcons[n].classList.add('starIconHighlighted')
                }
                for(let n = i+1 ; n < starIcons.length ; n++){
                    starIcons[n].classList.remove('starIconHighlighted')
                }
            }
        })
    })
    return ReactDOM.createPortal(
        <div className={styles.wrapper}>
            
            <div ref={mainContainer} data-maincontainer className={styles.mainContainer}>
                <span data-close onClick={closeModalButton} className="close-icon"></span>
                <h1>Add New Trip Details</h1>
                <div className={styles.subContainer}>
                    <div className={styles.detailsPart1}>
                        <div className={styles.tripMainImg}>
                            <div id={'mainImg'} className={styles.showMainImg}>
                                <div data-main></div>
                                {mainImg ? <img src={`${process.env.REACT_APP_API_LINK}/upload/imgs/${mainImg}`} alt='mainImg' /> : <p className={styles.noImg}>NO IMAGE SELECTED</p>}
                            </div>
                            <div className={styles.fileInputContainer}>
                                <span>Change Image</span>
                                <input className={styles.fileInput} data-maininput onChange={(e : React.ChangeEvent<HTMLInputElement>)=>updateMainImg(e)} type={'file'} />
                            </div>
                            
                        </div>
                        <div id={'subImgs'} className={styles.tripSubImgs}>
                            <div className={styles.showsubImgs}>
                                {!(subImgs.length === 0) && subImgs.map((subImg , i)=>{
                                    return(
                                    <div key={i} className={styles.subImgContainer}>
                                        <span onClick={() => removeImg(i)} className="close-icon"></span>
                                        <img src={`https://discovertheplanet.000webhostapp.com/travelWebsiteApi/api/upload/imgs/${subImg}`} alt='mainImg' />
                                    </div>
                                    )
                                })}
                                {(subImgs.length === 0) && <p className={styles.noImg}>NO IMAGE SELECTED</p>}
                            </div>
                            <div className={styles.fileInputSubContainer}>
                                <span>Add Image</span>
                                <input className={styles.fileInput} onChange={(e : React.ChangeEvent<HTMLInputElement>)=>updateSubImgs(e)} type={'file'} />
                            </div>
                            
                        </div>
                    </div>
                    <div className={styles.detailsPart2}>
                        <div className={styles.tripTitle}>
                            <label id={'title'}>Title</label>
                            <input data-title type={'text'} placeholder='title'/>
                        </div>
                        <div className={styles.tripDescription}>
                            <label id={'description'}>Description</label>
                            <textarea data-description  placeholder='description'/>
                        </div>
                        <div className={styles.tripExtraDetails}>

                            <div className={styles.tripRate}>
                                <label id={'tripRate'}>Trip Rate</label>
                                <div className={styles.starsContainer}>
                                    <span className="starIconMask"></span>
                                    <span className="starIconMask"></span>
                                    <span className="starIconMask"></span>
                                    <span className="starIconMask"></span>
                                    <span className="starIconMask"></span>
                                </div>
                            </div>
                            <div className={styles.tripPrice}>
                                <label id={'price'}>Price</label>
                                <span>$</span>
                                <input data-price type={'number'} placeholder='price'/>
                            </div>
                            <div className={styles.routeName}>
                                <label id={'routeName'}>Route Name</label>
                                <input data-routename type={'text'} placeholder='route name'/>
                            </div>
                            <div className={styles.tripType}>
                                <label id={'tripType'}>Trip Type</label>
                                <select data-triptype >
                                    <option>Flight</option>
                                    <option>Ship</option>
                                </select>
                            </div>
                            <div className={styles.tripAdate}>
                                <label id={'arrivalDate'}>Arrival Date</label>
                                <input data-adate type={'date'} placeholder='Arrival Date'/>
                            </div>
                            <div className={styles.tripDdate}>
                                <label id={'departureDate'}>Departure Date</label>
                                <input data-ddate type={'date'} placeholder='Departure Date'/>
                            </div>
                            <div className={styles.tripAtime}>
                                <label id={'arrivalTime'}>Arrival Time</label>
                                <input data-atime type={'time'} placeholder='Arrival Time'/>
                            </div>
                            <div className={styles.tripDtime}>
                                <label id={'departureTime'}>Departure Time</label>
                                <input data-dtime type={'time'} placeholder='Departure Time'/>
                            </div>
                            <div className={styles.ticketsAvailable}>
                                <label id={'ticketsAvailable'}>Tickets Available</label>
                                <input data-ticketsavailable type={'number'} placeholder='Tickets Available'/>
                            </div>
                            <div className={styles.airLine}>
                                <label id={'airLine'}>Airline</label>
                                <input data-airline type={'text'} placeholder='Airline'/>
                            </div>
                            <div className={styles.dFrom}>
                                <label id={'departureFrom'}>Depature From</label>
                                <input data-departurefrom type={'text'} placeholder='Depature From'/>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
                <button data-addproduct onClick={addTrip} type='submit' > Add Trip </button>
            </div>
        </div>
    ,document.body)
}
