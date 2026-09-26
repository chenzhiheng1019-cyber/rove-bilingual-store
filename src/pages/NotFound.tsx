import {tr,useLocale} from '../i18n';
import EmptyState from '../components/EmptyState';export default function NotFound(){useLocale();return <div className="not-found"><div className="terrain-lines" aria-hidden="true">{tr("404")}</div><EmptyState title={tr("OFF TRAIL.")} text="Looks like this path doesn't exist." home/></div>}
