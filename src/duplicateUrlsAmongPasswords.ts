import { Password } from './models';

export function duplicateUrlsAmongPasswords(passwordRecord: { [id: string]: Password }): null | {
    [url: string]: string[];
} {
    const result: { [url: string]: string[] } = {};
    const passwords = Object.values(passwordRecord);

    for (const p of passwords) {
        for (const u of p.url) {
            (result[u] ??= []).push(p.id);
        }
    }

    for (const [u, pIds] of Object.entries(result)) {
        if (pIds.length < 2) delete result[u];
    }

    return Object.entries(result).length > 0 ? result : null;
}
