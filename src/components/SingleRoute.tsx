
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { trip } from '../interfaces'; 
import styles from '../styles/singleroute.module.css'
import TourismSavageComponent from '../subComponents/TourismSavageComponent';

export function expandList(e:React.MouseEvent , expand : boolean){
    let checkClass = (e.target as HTMLSpanElement).classList.contains('activeExpandState');
    if(checkClass){
        (e.target as HTMLSpanElement).classList.remove('activeExpandState')
    }else{
        (document.querySelector('.activeExpandState') as HTMLSpanElement).classList.remove('activeExpandState');
        (e.target as HTMLSpanElement).classList.add('activeExpandState');
    }
    if(expand){
        (document.querySelector('[data-components-container]') as HTMLDivElement).classList.add('expandComponents');
    }else{
        (document.querySelector('[data-components-container]') as HTMLDivElement).classList.remove('expandComponents');
    }

}
export function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}
export default function SingleRoute() {
    let navigate = useNavigate();
    const query =  useQuery();
    let name = query.get('name')||'';
    let type = query.get('type')||'';
    useEffect(()=>{
        navigate(`?${type && `type=${type}&`}${name && `name=${name}`}`);
        if(!name && !type){
            navigate('/search')
        }
    },[navigate , name , type])

    let [searchData , setSearchData ] = useState<trip[]>([])
    //MEMOIZED FUNCTION TO FETCH DATA
    async function fetchData(url:string){
        try{
            let res = await fetch(url);
            let data = await res.json();
            if(data){ setSearchData(data); }
        }
        catch(e){
            console.log(e);
        }
    }
    //FUNCTION TO EXPAND LIST OR SHRINK IT
    
    
    //FETCH DATA ON LOAD
    useEffect(()=>{
        setTimeout(() => {
            fetchData(`${process.env.REACT_APP_API_LINK}/routes/readSpecificRoute.php?name=${name}&type=${type}`);
        }, 1000);
        
    },[name,type])
    return (
        <section className={styles.container}>
            { name || type ? <>
            <div className={styles.routeTitle}>
                <h1>Results for {`${name && name} ${type && type?.replace('_',' ')}`}</h1>
                <div className={styles.showWay}>
                    <span onClick={(e:React.MouseEvent)=>expandList(e,false)} className='shrink-icon activeExpandState'></span>
                    <span onClick={(e:React.MouseEvent)=>expandList(e,true)} className='expand-icon'></span>
                </div>
            </div>
            <div data-components-container className={styles.allComponents}>
                
                {(searchData.length>0) ? searchData.map((trip)=> { return <TourismSavageComponent key={trip.rowId} {...trip} />}) : <div><h1>NO TRIPS FOUND FOR {`${name && name} ${type && type?.replace('_',' ')}`} </h1></div> }
                
                
            </div> </> : <div><h1>LOADING ...</h1></div>}
            
        </section>
    )
}
