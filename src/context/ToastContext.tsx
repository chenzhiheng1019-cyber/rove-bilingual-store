import {tr,useLocale} from '../i18n';
import {createContext,useContext,useState,useRef,type ReactNode} from 'react';
const C=createContext<(s:string)=>void>(()=>{});
export function ToastProvider({children}:{children:ReactNode}){useLocale();const [message,set]=useState('');const timer=useRef<ReturnType<typeof setTimeout>>(undefined);function toast(s:string){clearTimeout(timer.current);set(s);timer.current=setTimeout(()=>set(''),3500)}return <C.Provider value={toast}>{tr(children)}<div className={'toast '+(message?'visible':'')} role="status">{tr(message)}</div></C.Provider>}
export const useToast=()=>useContext(C);
