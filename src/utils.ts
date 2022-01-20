import type { IMarkdownSyntax } from './Interfaces';

export const trimm = (str : string) : string => str.replace(/^ +/, '').replace(/ +$/, '')

export const parseTextToMarkdown = (text: string) : string => {
    let syntax : IMarkdownSyntax[] = [
        {
            start: '\\*\\*',
            end: '\\*\\*',
            class: 'bold'
        },
        {
            start: '__',
            end: '__',
            class: 'italic'
        },
        {
            start: '~~',
            end: '~~',
            class: 'linethrough'
        },
        {
            start: '^###',
            end: '(\\n|$)',
            class: 'header3'
        },
        {
            start: '^##',
            end: '(\\n|$)',
            class: 'header2'
        },
        {
            start: '^#',
            end: '(\\n|$)',
            class: 'header1'
        },
    ]

    syntax.forEach(elem => {
        text = text.replace(RegExp(`${elem.start}.+?${elem.end}`, 'g'), (part:string) : string => {
            let start = elem.start.replace(/\\/g, '')
            let end = elem.end.replace(/\\/g, '')
            if (['header1', 'header2', 'header3'].includes(elem.class)) {
                return `<span class='${elem.class}'>` + part.substring(start.length - 1, part.length).replace('\n', '') + `</span>\n`
            }
            return `<span class='${elem.class}'>` + part.substring(start.length, part.length - end.length) + `</span>`
        })
    })
    return text
}

export const sanitize = (s : string) : string => s.replace(/</g, '&#60;').replace(/>/g, '&#62;')