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

   const handlerSelect = (e) => {
    setState({
      ...state,
      status: e.target.value
    })

   }

   
  return (
    <div>
      <select onChange={(e)=>{props.handleChange(e, props.id);  handlerSelect(e)}}>
      {valores.map((val, index)=>{
        if(state.status === val){
            return <option value={`${val}`} key={index} defaultValue>{val}</option>
        }else{
          return <option value={`${val}`} key={index}>{val}</option>      }            
      })}
      </select>
    </div>
  );
}