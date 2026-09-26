import {tr,useLocale} from '../i18n';
import {createContext,useContext,useState,type ReactNode} from 'react';
import type {User} from '../types/user';
import {read,save} from '../utils/storage';
const C=createContext<{user:User|null;signIn:(u:User,remember:boolean)=>void;signOut:()=>void}>(null!);
export function AuthProvider({children}:{children:ReactNode}){useLocale();const [user,set]=useState<User|null>(()=>read('rove_bilingual_user',null)||JSON.parse(sessionStorage.getItem('rove_bilingual_user')||'null'));return <C.Provider value={{user,signIn(u,remember){set(u);if(remember){save('rove_bilingual_user',u);sessionStorage.removeItem('rove_bilingual_user')}else{localStorage.removeItem('rove_bilingual_user');sessionStorage.setItem('rove_bilingual_user',JSON.stringify(u))}},signOut(){set(null);localStorage.removeItem('rove_bilingual_user');sessionStorage.removeItem('rove_bilingual_user')}}}>{tr(children)}</C.Provider>}
export const useAuth=()=>useContext(C);
