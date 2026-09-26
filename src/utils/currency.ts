export const currency=(n:number)=>'¥'+n.toLocaleString('en-US');
export const shippingFor=(subtotal:number)=>subtotal===0||subtotal>=800?0:20;
