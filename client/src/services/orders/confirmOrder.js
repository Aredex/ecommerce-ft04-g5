import axios from 'axios';

export default async function confirmOrder(idOrder){
	return
	       axios.put(`http://localhost:3001/orders/${idOrder}/confirmed`, { address})
	       .then((response)=>{
	       	return response.data;
	       })
	       .catch(()=>{
	       	return undefined;
	       })
}