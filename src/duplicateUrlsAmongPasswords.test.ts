import { duplicateUrlsAmongPasswords } from './duplicateUrlsAmongPasswords';
import { Password } from './models';

const defaultPassword: Password = {
    createdAt: 0,
    id: '',
    name: '',
    url: [''],
    value: '',
    description: '',
    lastModifiedAt: 0,
};

type Fn = typeof duplicateUrlsAmongPasswords;
type Cases = [Parameters<Fn>, ReturnType<Fn>][];

describe(duplicateUrlsAmongPasswords.name, () => {
    describe('when different passwords have the same urls', () => {
        const cases: Cases = [
            [
                [
                    {
                        id1: {
                            ...defaultPassword,
                            id: 'id1',
                            url: ['first', 'second'],
                        },
                        id2: {
                            ...defaultPassword,
                            id: 'id2',
                            url: ['second'],
                        },
                    },
                ],
                true,
            ],
            [
                [
                    {
                        id1: {
                            ...defaultPassword,
                            id: 'id1',
                            url: ['first', 'second', 'third'],
                        },
                        id2: {
                            ...defaultPassword,
                            id: 'id2',
                            url: [],
                        },
                        id3: {
                            ...defaultPassword,
                            id: 'id2',
                            url: ['first', 'third'],
                        },
                    },
                ],
                true,
            ],
        ];

        it.each(cases)("should return 'true'", (params, expected) => {
            expect(duplicateUrlsAmongPasswords(...params)).toBe(expected);
        });
    });

    describe('when different passwords have different urls', () => {
        const cases: Cases = [
            [
                [
                    {
                        id1: {
                            ...defaultPassword,
                            id: 'id1',
                            url: ['first', 'second'],
                        },
                        id2: {
                            ...defaultPassword,
                            id: 'id2',
                            url: ['third'],
                        },
                    },
                ],
                false,
            ],
            [
                [
                    {
                        id1: {
                            ...defaultPassword,
                            id: 'id1',
                            url: [],
                        },
                        id2: {
                            ...defaultPassword,
                            id: 'id2',
                            url: [],
                        },
                    },
                ],
                false,
            ],
        ];

        it.each(cases)("should return 'false'", (params, expected) => {
            expect(duplicateUrlsAmongPasswords(...params)).toBe(expected);
        });
    });
});
