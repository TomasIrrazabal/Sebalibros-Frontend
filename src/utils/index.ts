// supabase.ts
import { createClient } from '@supabase/supabase-js'
import { Status } from '../types/bookTypes';

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export function publicUrl(bucket: string, path: string) {
    const base = import.meta.env.VITE_SUPABASE_URL
    const cleanPath = path.replace(/^\/+/, '');
    return `${base}/storage/v1/object/public/${bucket}/${(cleanPath)}`
}


export const isActiveBook = (estado: Status): boolean => {
    return estado === Status.active;
};


export function getDifferences<T extends object>(original: T, updated: T): Partial<T> {
    const diff: Partial<T> = {};
    (Object.keys(updated) as (keyof T)[]).forEach((key) => {
        if (updated[key] !== original[key]) {
            diff[key] = updated[key];
        }
    });
    return diff;
}