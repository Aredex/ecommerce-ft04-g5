import axios from 'axios';

export default async function rejectOrder(idOrder){
	return
	       axios.put(`http://localhost:3001/orders/${idOrder}/rejected`)
	       .then((response)=>{
	       	return response.data;
	       })
	       .catch(()=>{
	       	return undefined;
	       })
}