import { writable } from 'svelte/store'
import shortid from 'shortid'
import type { INote } from './Interfaces'

const setLSNotes = (notes : INote[]) : void => localStorage.setItem('notes', JSON.stringify(notes)) 
const getLSNotes = () : INote[] => JSON.parse(localStorage.getItem('notes'))

function createNotesStore() {
    if (!getLSNotes()) setLSNotes([])

    const {subscribe, set, update} = writable(getLSNotes())

    const addNote = (text : string = '', header : string = '') : void => {
        const note : INote = {
            text,
            header,
            id: shortid.generate(),
            tags: []
        }
        update(notes => {
            setLSNotes([...notes, note])
            return getLSNotes()
        })
    }

    const removeNote = (id : string) : void => {
        update(notes => {
            setLSNotes(notes.filter(note => note.id !== id))
            return getLSNotes()
        })
    }

    const changeNote = (id : string, text : string) : void => {
        update(notes => {
            setLSNotes(notes.map(note => ({
                ...note,
                text: note.id === id ? text : note.text
            })))
            return getLSNotes()
        })
    }

    return {
        subscribe,
        add: addNote,
        remove: removeNote,
        change: changeNote
    }
}

const notes = createNotesStore()
export default notes