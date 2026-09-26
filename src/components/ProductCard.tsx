import {tr,useLocale} from '../i18n';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Heart,ArrowUpRight} from 'lucide-react';
import type {Product} from '../types/product';
import {currency} from '../utils/currency';
import {useCart} from '../context/CartContext';
import Overlay from './Overlay';
import SizeSelector from './SizeSelector';
export default function ProductCard({p}:{p:Product}){useLocale();
 const [liked,setLiked]=useState(false),[quick,setQuick]=useState(false),[size,setSize]=useState<number|null>(null),[error,setError]=useState('');
 const cart=useCart();
 return <article className="product-card">
  <div className="product-visual">
   <Link to={'/product/'+p.id} aria-label={tr(p.name)}><img src={p.image} alt={tr(`${p.name}, ${p.color}, side profile`)} loading="lazy"/><img className="alternate" src={p.image} alt={tr("")} loading="lazy"/></Link>
   {tr(p.badge&&<span className={'badge '+p.badge.toLowerCase().replace(' ','-')}>{tr(p.badge)}</span>)}
   <button className={'favorite icon '+(liked?'liked':'')} aria-label={tr((liked?'Unsave ':'Save ')+p.name)} aria-pressed={liked} onClick={()=>setLiked(!liked)}><Heart size={18} fill={liked?'currentColor':'none'}/></button>
   <button className="quick" onClick={()=>{setQuick(true);setSize(null);setError('')}} aria-label={tr('Quick add '+p.name)}>{tr("QUICK ADD ")}<ArrowUpRight size={16}/></button>
  </div>
  <Link to={'/product/'+p.id} className="product-name">{tr(p.name)}</Link>
  <div className="product-meta"><span>{tr(p.color)}</span><span>{tr(p.originalPrice&&<del>{tr(currency(p.originalPrice))}</del>)} {tr(currency(p.price))}</span></div>
  {tr(quick&&<Overlay title={tr("QUICK ADD")} onClose={()=>setQuick(false)} kind="quick-panel">
   <img src={p.image} alt={tr(p.name)}/><h2>{tr(p.name)}</h2><p>{tr(p.color)}{tr(" · ")}{tr(currency(p.price))}</p><p className="eyebrow">{tr("SELECT SIZE")}</p>
   <SizeSelector size={size} onChange={n=>{setSize(n);setError('')}}/>
   {tr(error&&<p className="error" role="alert">{tr(error)}</p>)}
   <button className="button full" onClick={()=>{if(!size){setError('Please select a size.');return}setQuick(false);cart.add({productId:p.id,name:p.name,price:p.price,image:p.image,color:p.color,size,quantity:1})}}>{tr("ADD TO BAG — ")}{tr(currency(p.price))}{tr(" ↗")}</button>
   <Link className="text-link" to={'/product/'+p.id} onClick={()=>setQuick(false)}>{tr("VIEW FULL DETAILS →")}</Link>
  </Overlay>)}
 </article>
}
