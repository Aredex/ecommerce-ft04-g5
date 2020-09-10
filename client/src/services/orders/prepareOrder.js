import axios from 'axios';

export default async function prepareOrder(idOrder){
	return
	       axios.put(`http://localhost:3001/orders/${idOrder}/preparing`)
	       .then((response)=>{
	       	return response.data;
	       })
	       .catch(()=>{
	       	return undefined;
	       })
}