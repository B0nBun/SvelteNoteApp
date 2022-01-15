export const trimm = (str : string) : string => {
    str = str.replace(/^ +/, '')
    str = str.replace(/ +$/, '')
    return str
}