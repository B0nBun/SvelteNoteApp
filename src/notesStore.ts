import { writable } from 'svelte/store'
import shortid from 'shortid'
import type { INote } from './Interfaces'

const setLSNotes = (notes : INote[]) => localStorage.setItem('notes', JSON.stringify(notes)) 
const getLSNotes = () => JSON.parse(localStorage.getItem('notes'))

function createNotesStore() {
    if (!getLSNotes()) setLSNotes([])

    const {subscribe, set, update} = writable(getLSNotes())

    const setNotes = (notes : INote[]) => {
        setLSNotes(notes)
        set(notes)
    }

    const addNote = (text: string, header?: string) => {
        const newNote = {
            text,
            header,
            id: shortid.generate(),
        }
        
        update(notes => {
            const newNotes = [...notes, newNote]
            setLSNotes(newNotes)
            return newNotes
        })
    }

    const removeNote = (id : string) => {
        update(notes => {
            const newNotes = notes.filter(note => note.id !== id)
            setLSNotes(newNotes)
            return newNotes
        })
    }

    const changeNote = (id : string, newText : string) => {
        update(notes => {
            const newNotes = notes.map(note => {
                if (note.id !== id) return note
                note.text = newText
                return note
            })
            console.log(newNotes)
            setLSNotes(newNotes)
            return newNotes
        })
    }

    return {
        subscribe,
        set : setNotes,
        add : addNote,
        remove : removeNote,
        change : changeNote
    }
}

const notes = createNotesStore()
export default notes