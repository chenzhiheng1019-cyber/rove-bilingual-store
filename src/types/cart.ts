export interface CartItem {productId:string;name:string;price:number;image:string;color:string;size:number;quantity:number}
export interface Order {id:string;items:CartItem[];subtotal:number;shipping:number;total:number;createdAt:string;address:Record<string,string>}
