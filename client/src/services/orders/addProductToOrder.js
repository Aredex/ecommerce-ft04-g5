import axios from 'axios';

export default async function addProducToOrder(idOrder, idProduct){
	return
	       axios.post(`http://localhost:3001/orders/${idOrder}/product/${idProduct}`)
	       .then((respose)=>{
	       	return respose.data;
	       })
	       .catch(()=>{
	       	return undefined;
	       })
}