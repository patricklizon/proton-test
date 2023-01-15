import { Password } from './models';

export function duplicateUrlsAmongPasswords(passwords: { [id: string]: Password }) {
    const set = new Set<string>();
    const urls = Object.values(passwords).flatMap((p) => p.url);

    for (const u of urls) {
        if (set.has(u)) return true;
        set.add(u);
    }

    return false;
}
