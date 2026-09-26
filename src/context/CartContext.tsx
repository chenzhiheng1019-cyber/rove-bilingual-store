import {tr,useLocale} from '../i18n';
import {createContext,useContext,useState,useEffect,type ReactNode} from 'react';
import type {CartItem} from '../types/cart';
import {read,save} from '../utils/storage';
import {shippingFor} from '../utils/currency';
import {useToast} from './ToastContext';
const key=(i:CartItem)=>`${i.productId}-${i.color}-${i.size}`;
interface State {items:CartItem[];count:number;subtotal:number;shipping:number;total:number;open:boolean;setOpen:(v:boolean)=>void;add:(i:CartItem)=>void;update:(i:CartItem,n:number)=>void;remove:(i:CartItem)=>void;clear:()=>void}
const C=createContext<State>(null!);
export function CartProvider({children}:{children:ReactNode}){useLocale();const [items,set]=useState<CartItem[]>(()=>{const a=read<unknown>('rove_bilingual_cart',[]);return Array.isArray(a)?a.filter(i=>i&&typeof i.price==='number'&&i.quantity>0&&Number.isInteger(i.quantity)&&typeof i.productId==='string'):[]});const [open,setOpen]=useState(false);const toast=useToast();useEffect(()=>{if(!save('rove_bilingual_cart',items))toast('Storage is unavailable. Keep this tab open to retain your bag.')},[items]);const subtotal=items.reduce((s,i)=>s+i.price*i.quantity,0),shipping=shippingFor(subtotal);return <C.Provider value={{items,open,setOpen,count:items.reduce((s,i)=>s+i.quantity,0),subtotal,shipping,total:subtotal+shipping,add(i){set(a=>{const found=a.find(x=>key(x)===key(i));return found?a.map(x=>key(x)===key(i)?{...x,quantity:Math.min(99,x.quantity+i.quantity)}:x):[...a,i]});setOpen(true);toast('Added to bag')},update(i,n){if(n>=1&&n<=99)set(a=>a.map(x=>key(x)===key(i)?{...x,quantity:n}:x))},remove(i){set(a=>a.filter(x=>key(x)!==key(i)));toast('Item removed')},clear(){set([])}}}>{tr(children)}</C.Provider>}
export const useCart=()=>useContext(C);
