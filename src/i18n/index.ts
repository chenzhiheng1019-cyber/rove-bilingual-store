import {useSyncExternalStore} from 'react';
import {zh} from './zh';
export type Locale='zh'|'en';
function saved(){try{const l=localStorage.getItem('rove_bilingual_language');return l==='zh'||l==='en'?l:null}catch{return null}}
let locale:Locale=saved()||'en';
let chosen=!!saved();
const listeners=new Set<()=>void>();
const subscribe=(listener:()=>void)=>{listeners.add(listener);return()=>{listeners.delete(listener)}};
export function useLocale(){return useSyncExternalStore(subscribe,()=>locale,()=> 'en' as Locale)}
export const hasChosenLanguage=()=>chosen;
export function setLocale(next:Locale){locale=next;chosen=true;try{localStorage.setItem('rove_bilingual_language',next)}catch{}document.documentElement.lang=next==='zh'?'zh-CN':'en';listeners.forEach(fn=>fn())}
const lower=Object.fromEntries(Object.entries(zh).map(([k,v])=>[k.toLowerCase(),v]));
function translate(s:string):string{
 const key=s.trim().replace(/\s+/g,' ');if(!key)return s;
 const exact=zh[key]||lower[key.toLowerCase()];if(exact)return s.replace(s.trim(),exact);
 const arrow=key.match(/^(.*?)\s*([↗→])$/);if(arrow){const v=zh[arrow[1]]||lower[arrow[1].toLowerCase()];if(v)return v+' '+arrow[2]}
 let m=key.match(/^(YOUR BAG|Bag) \((\d+)\)$/i);if(m)return `购物袋（${m[2]}）`;
 m=key.match(/^You are (¥[\d,]+) away from free shipping\.$/);if(m)return `再购 ${m[1]} 即可享受免运费。`;
 m=key.match(/^Results for “(.*)”$/);if(m)return `“${m[1]}”的搜索结果`;
 m=key.match(/^Size (\d+)( sold out)?$/);if(m)return `尺码 ${m[1]}${m[2]?' 已售罄':''}`;
 for(const prefix of ['Close ','Color ','Save ','Unsave ','Quick add '])if(key.startsWith(prefix))return (zh[prefix.trim()]||prefix)+ ' '+translate(key.slice(prefix.length));
 return s;
}
export function tr<T>(value:T):T{return (locale==='zh'&&typeof value==='string'?translate(value):value) as T}
export function localizedSearch(query:string){return query.replace(/岩灰|石色/g,'stone').replace(/越野|山野/g,'trail').replace(/徒步/g,'hiking').replace(/城市|休闲/g,'lifestyle').replace(/恢复|舒缓/g,'recovery').replace(/黑色|黑/g,'black').replace(/灰色|灰/g,'grey').replace(/沙色|沙/g,'sand').replace(/橄榄绿|橄榄/g,'olive').replace(/岩灰|石色/g,'stone')}
