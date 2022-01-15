import { writable } from 'svelte/store'
import shortid from 'shortid'
import type { INote } from './Interfaces'

const setLSNotes = (notes : INote[]) : void => localStorage.setItem('notes', JSON.stringify(notes)) 
const getLSNotes = () : INote[] => JSON.parse(localStorage.getItem('notes'))

function createNotesStore() {
    // TODO: Remove this test note, when the development is finished
    if (!getLSNotes()) setLSNotes([{
        id: "test",
        text: "This is a test note",
        name: "Note Name",
        tags: []
    }])

    const {subscribe, set, update} = writable(getLSNotes())

    const addNote = (text : string = '', name : string = '') : void => {
        const note : INote = {
            text,
            name,
            id: shortid.generate(),
            tags: []
        }

        if (!name) {
            note.name = `Note ${note.id}`
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

    const changeNoteText = (id : string, text : string) : void => {
        update(notes => {
            setLSNotes(notes.map(note => ({
                ...note,
                text: note.id === id ? text : note.text
            })))
            return getLSNotes()
        })
    }

    const changeNoteName = (id : string, name : string) : void => {
        update(notes => {
            setLSNotes(notes.map(note => ({
                ...note,
                name: note.id === id ? name : note.text
            })))
            return getLSNotes()
        })
    }

    const get = (id : string) : INote | undefined => {
        let resNote : INote;
        update(notes => {
            notes.map(note => {
                if (note.id === id) resNote = note
                return note
            })
            return notes
        })
        return resNote
    }

    return {
        subscribe,
        add: addNote,
        remove: removeNote,
        changeName: changeNoteName,
        changeText: changeNoteText,
        get: get,
    }
}

const notes = createNotesStore()
export default notes