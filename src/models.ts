export interface Password {
    id: string;
    name: string;
    description?: string;
    value: string;
    url: string[];
    createdAt: number;
    lastModifiedAt?: number;
}
