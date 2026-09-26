import {tr,useLocale} from '../i18n';
import {Link} from 'react-router-dom';
export default function EmptyState({title='NOTHING FOUND.',text='Try another search or explore all footwear.',home=false}:{title?:string;text?:string;home?:boolean}){useLocale();return <section className="empty"><span className="eyebrow">{tr("FIND YOUR NEXT PATH")}</span><h1>{tr(title)}</h1><p>{tr(text)}</p><Link className="button" to={home?'/':'/shop'}>{tr(home?'RETURN HOME':'SHOP ALL')}{tr(" ↗")}</Link></section>}
