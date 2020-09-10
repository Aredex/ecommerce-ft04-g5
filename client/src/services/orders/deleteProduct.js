import axios from 'axios';

export default async function deleteProduct(idOrder, idProduct){
	return
	       axios.delete(`http://localhost:3001/orders/${idOrder}/product/${idProduct}`)
	       .then((respose)=>{
	       	return respose.data;
	       })
	       .catch(()=>{
	       	return undefined;
	       })
}