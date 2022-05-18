import React,{useEffect,useState}from"react";
import { Offline, Online } from "react-detect-offline";
import Title from "./Title";

const Temp=()=>{ 
    const[isloading,setIsloading]=useState(false);
    const[city,setCity]=useState(null);
    const[search,setSearch]=useState("");

    useEffect(()=>{
        const fetchApi=async()=>{
            setIsloading(true); 
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=680f9c848d1a4283429b81a801d17e53`            
            const response=await fetch(url);
            const resJson=await response.json();
            setCity(resJson.main)
            setIsloading(false);
        }
        fetchApi();
    },[search])
    const handleChange=(e)=>{
        let val=e.target.value;
        setSearch(val);
    }
    return(
        <>
        <Offline><h1>You are offline!Please check your connection.</h1></Offline> 
        <Online>
        <Title/>
        <div className="box">
            <div className="inputData">
                <input type="search"className="inputField"placeholder="enter your city"onChange={handleChange}/>
            </div>
            {isloading ? (<h1>loading...</h1>) : 
             (<div>
                {city?(
                 <div>
                 <div className="info">
                     <h2 className="location">
                         <i className="fas fa-street-view"></i>{search}
                     </h2>
                     <h1 className="temp">
                     <i className="fas fa-cloud-meatball"></i>{city.temp}°Cel</h1> 
                    <h3 className="tempmin_max">Min :{city.temp_min} |Max :{city.temp_max}</h3>
                 </div>
                 <div className="wave-one"></div>
                 <div className="wave-two"></div>
                 <div className="wave-three"></div>
              </div> ):
               (<p>No Data found</p>)}
              </div>)
             }
            </div>
            </Online>
        </>
    )}
        export default Temp;

       