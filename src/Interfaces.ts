// TODO: Maybe replace interface with class
export interface INote {
    id: string,
    tags: string[],
    text: string,
    header?: string | null
}