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

const cases: Cases = [
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
        null,
    ],
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
        {
            second: ['id1', 'id2'],
        },
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
                    url: ['third'],
                },
                id3: {
                    ...defaultPassword,
                    id: 'id3',
                    url: ['third'],
                },
            },
        ],
        {
            third: ['id1', 'id2', 'id3'],
        },
    ],
];

describe(duplicateUrlsAmongPasswords.name, () => {
    it.each(cases)('return correct password ids', (params, expected) => {
        expect(duplicateUrlsAmongPasswords(...params)).toEqual(expected);
    });
});
