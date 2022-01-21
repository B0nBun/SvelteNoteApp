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
            start: '\\n# ',
            end: '(\\n|$)',
            class: 'header1'
        },
        {
            start: '\\n## ',
            end: '(\\n|$)',
            class: 'header2'
        },
        {
            start: '\\n### ',
            end: '(\\n|$)',
            class: 'header3'
        },
    ]

    syntax.forEach(elem => {
        text = text.replace(RegExp(`${elem.start}.+?${elem.end}`, 'g'), (part:string) : string => {
            if (['header1', 'header2', 'header3'].includes(elem.class)) {
                let newlinescount = (part.match(/\n/g) || []).length
                return `\n<span class='${elem.class}'>` + part.substring(1).replace(/\n/, '') + `</span>` + (newlinescount ? '\n' : '')
            }
            return `<span class='${elem.class}'>` + part + `</span>`
        })
    })
    return text
}

export const sanitize = (s : string) : string => s.replace(/</g, '&#60;').replace(/>/g, '&#62;')