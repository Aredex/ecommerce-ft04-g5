import axios from 'axios';

export default async function completedOrder(idOrder){
	return
	       axios.put(`http://localhost:3001/orders/${idOrder}/finalized`)
	       .then((response)=>{
	       	return response.data;
	       })
	       .catch(()=>{
	       	return undefined;
	       })
}