import {tr,useLocale} from '../i18n';
import ProductCard from './ProductCard';import type {Product} from '../types/product';
export default function ProductGrid({products}:{products:Product[]}){useLocale();return <div className="product-grid">{tr(products.map(p=><ProductCard key={p.id} p={p}/>))}</div>}
