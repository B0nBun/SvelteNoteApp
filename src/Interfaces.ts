// TODO: Maybe replace interface with class
export interface INote {
    id: string,
    tags: string[],
    name: string,
    text: string,
}

export interface IMarkdownSyntax {
    start: string,
    end: string,
    class: string,
}