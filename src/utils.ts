import type { IMarkdownSyntax } from './Interfaces';

export const trimm = (str : string) : string => str.replace(/^ +/, '').replace(/ +$/, '')

export const insertString = (str : string, pos : number, ins : string)=> str.slice(0, pos) + ins + str.slice(pos)

export const parseTextToMarkdown = (text: string) : string => {
    let syntax : IMarkdownSyntax[] = [
        {
            start: '\\*',
            end: '\\*',
            class: 'bold'
        },
        {
            start: '_',
            end: '_',
            class: 'italic'
        },
        {
            start: '~',
            end: '~',
            class: 'linethrough'
        },
        {
            start: '`',
            end: '`',
            class: 'monospace'
        },
        {
            start: '###',
            end: '###',
            class: 'header3'
        },
        {
            start: '##',
            end: '##',
            class: 'header2'
        },
        {
            start: '#',
            end: '#',
            class: 'header1'
        },
    ]

    syntax.forEach(elem => {
        text = text.replace(RegExp(`${elem.start}.+?${elem.end}`, 'g'), (part:string) : string => {
            if (elem.class === 'bold') {
                return `<span class='${elem.class}'>` +
                        part.substring(elem.start.length-1, part.length - elem.start.length+1) +
                        `</span>`
            }
            return `<span class='${elem.class}'>` +
                    part.substring(elem.start.length, part.length - elem.start.length) +
                    `</span>`
        })
    })
    return text
}

export const sanitize = (s : string) : string => s.replace(/</g, '&#60;').replace(/>/g, '&#62;')