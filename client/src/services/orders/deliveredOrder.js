import axios from 'axios';

export default async function deliveredOrder(idOrder){
	return
	       axios.put(`http://localhost:3001/orders/${idOrder}/delivered`)
	       .then((response)=>{
	       	return response.data;
	       })
	       .catch(()=>{
	       	return undefined;
	       })
}