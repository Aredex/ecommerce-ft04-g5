import axios from 'axios';

export default async function sendOrder(idOrder){
	return
	       axios.put(`http://localhost:3001/orders/${idOrder}/sent`)
	       .then((response)=>{
	       	return response.data;
	       })
	       .catch(()=>{
	       	return undefined;
	       })
}