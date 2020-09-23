import React, { useState, useEffect } from "react";


const valores = [
                "IN CREATION",
                "CONFIRMED",
                "REJECTED",
                "PREPARING",
                "SENT",
                "DELIVERED",
                "FINALIZED"
                ]

export default function Select(props) {
   const [ state, setState ] = useState({ status: props.status})

   

   
  return (
    <div>
      <select onChange={(e)=>{props.handleChange(e, props.id, props.address)}}>
      {valores.map((val, index)=>{
        if(state.status === val){
            return <option value={`${val}`} key={index} selected>{val}</option>
        }else{
          return <option value={`${val}`} key={index}>{val}</option>      }            
      })}
      </select>
    </div>
  );
}