/** Resolve public images under the current deployment base path. */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\/+/, '');
