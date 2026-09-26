export const validPhone=(s:string)=>/^\d{11}$/.test(s);
export const phoneError='Enter a valid 11-digit phone number.';
export function validateAddress(v:Record<string,string>){const e:Record<string,string>={};for(const k of ['fullName','phone','province','city','district','address'])if(!v[k]?.trim())e[k]='This field is required.';if(v.phone&&!validPhone(v.phone))e.phone=phoneError;return e}
