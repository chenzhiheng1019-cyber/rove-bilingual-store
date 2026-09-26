import {useEffect,useState} from 'react';
import {hasChosenLanguage,setLocale,useLocale,type Locale} from '../i18n';
import Overlay from './Overlay';
export default function LanguageChoice(){
 const locale=useLocale();const [open,setOpen]=useState(!hasChosenLanguage());
 useEffect(()=>{document.documentElement.lang=locale==='zh'?'zh-CN':'en'},[locale]);
 function choose(value:Locale){setLocale(value);setOpen(false)}
 return <><button className="language-switch" aria-label="选择语言 / Change language" onClick={()=>setOpen(true)}>{locale==='zh'?'中文 / EN':'EN / 中文'}</button>{open&&<Overlay title="ROVE / LANGUAGE" onClose={()=>{if(!hasChosenLanguage())setLocale('en');setOpen(false)}} kind="language-panel"><p className="eyebrow">MOVE BEYOND.</p><h2>选择你的语言<span>CHOOSE YOUR LANGUAGE</span></h2><p className="language-intro">用熟悉的语言，开启下一段旅程。<br/>Your next move starts here.</p><div className="language-options"><button onClick={()=>choose('zh')} lang="zh-CN"><strong>中文</strong><span>简体中文</span><span aria-hidden="true">↗</span></button><button onClick={()=>choose('en')} lang="en"><strong>English</strong><span>English</span><span aria-hidden="true">↗</span></button></div><p className="language-note">稍后可在导航栏随时切换。<br/>You can change this anytime in the navigation.</p></Overlay>}</>}
