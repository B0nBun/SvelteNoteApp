<script lang='ts'>
    import type { INote } from '../Interfaces'
    import { tick, onMount, beforeUpdate } from "svelte/internal";
    import { parseTextToMarkdown, sanitize, trimm, insertString } from "../utils";
    import notes from "../notesStore";

    export let params : {noteid: string};
    const noteid = params.noteid
    
    let note : INote = notes.get(noteid)
    let noteStates : string[] = []
    let noteArea : HTMLTextAreaElement;
    let nameInput : HTMLInputElement;
    let tagsStr : string;
    let tagDashError : boolean = false;
    let undoTimer : ReturnType<typeof setTimeout> = null;
    
    const textareaAutoResize = () : void => {
        noteArea.style.height = 'auto'
        noteArea.style.height = (noteArea.scrollHeight) + 'px'
    }

    const handleNameChange = () : void => {
        notes.changeName(noteid, nameInput.value)
    }

    const handleInput = () : void => {
        // Ssaves note state if the last change was made 200ms ago
        clearTimeout(undoTimer)
        let prevState = noteArea.value
        undoTimer = setTimeout(() => {
            noteStates.push(prevState)
        }, 200)

        notes.changeText(noteid, noteArea.value)
        textareaAutoResize()
    }

    const handleTextareaKeydown = async (e : KeyboardEvent) : Promise<void> => {
        // TODO: Should think about how to implement Ctrl+Z in a better way
        // TODO: Also fix the jumping to end cursor
        if ('"\'`*:_'.split('').includes(e.key)) {
            const selectionStart : number = noteArea.selectionStart
            const selectionEnd : number = noteArea.selectionEnd
            if (selectionStart === selectionEnd) return
            e.preventDefault()
            note.text = insertString(note.text, selectionStart, e.key)
            note.text = insertString(note.text, selectionEnd+1, e.key)
            await tick()
            noteArea.setSelectionRange(selectionStart, selectionEnd + 2)
        }

        if (e.key === 'z' && e.ctrlKey) {
            e.preventDefault()
            if (note.text === noteStates[noteStates.length - 1]) noteStates.pop()
            note.text = noteStates.pop() || note.text
            notes.changeText(noteid, note.text)
            textareaAutoResize()
        }
    }

    const handleTagsAdd = () : void => {
        if (!tagsStr) return
        tagsStr = trimm(tagsStr)
        let tags = tagsStr.split(/ +/)
        if (tags.some(tag => tag.match(/^-/))) {
            tagDashError = true
            return
        }

        tags.map(tag => {
            notes.addTag(noteid, tag)
        })
        note.tags = notes.get(noteid).tags
        tagDashError = false
        tagsStr = ''
    }
    
    const handleTagsRemove = () : void => {
        if (!tagsStr) return
        tagsStr = trimm(tagsStr)
        let tags = tagsStr.split(/ +/)
        tags.map(tag => {
            notes.removeTag(noteid, tag)
        })
        note.tags = notes.get(noteid).tags
        tagDashError = false
        tagsStr = ''
    }
    
    const handleEscape = (e : KeyboardEvent) : void => {
        if (e.key === 'Escape') {
            if (noteArea === document.activeElement) {
                noteArea.blur()
                return
            }
            window.location.replace('/#/')
        }
    }

    onMount(() => {
        textareaAutoResize()
        window.addEventListener('keydown', handleEscape)
        
        return () => window.removeEventListener('keydown', handleEscape)
    })
</script>

<svelte:head>
    <title>{note.name}</title>
</svelte:head>

<div class='wrapper'>
    <div class="note">
        <div class="header">
            <input class='name' bind:this={nameInput} on:input={handleNameChange} value={note.name}/>
            <form class='tag-box'>
                {#if tagDashError}
                    <p style='color: red'>Tagname shouldn't start with dash</p>
                {/if}
                <input placeholder='Tag' bind:value={tagsStr} />
                <button on:click|preventDefault={handleTagsAdd} class='btn'>add</button>
                <button on:click|preventDefault={handleTagsRemove} class='btn'>remove</button>
            </form>
        </div>
        <hr />
        <textarea
            class='text'
            spellcheck={false} rows=1
            on:keydown={handleTextareaKeydown}
            on:input={handleInput}
            bind:this={noteArea}
            bind:value={note.text}
        />
        <pre class='text'>
            {@html parseTextToMarkdown(sanitize(note.text))}
        </pre>
        <span class='muted'>{note.tags.join('; ')}</span>
    </div>
</div>

<style lang='scss'>
    pre {
        font-family: sans-serif;
    }
    
    .wrapper {
        padding-top: 1rem;
    }
    
    .note {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        width: 100%;
        border-radius: .5rem;
        padding: 1rem 2rem;
        box-shadow: 0 7px 20px #aaa;
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .name {
        font-size: 1.5rem;
        font-weight: bold;
        border: 1px solid transparent;
        border-radius: .2rem;
        outline: none;

        &:focus {
            border: 1px solid #aaa;
            outline: none;
        }
    }

    .tag-box {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    hr {
        margin-bottom: 1rem;
    }

    .text {
        resize: none;
        overflow-y: hidden;
        font-size: 1.2rem;
        border: 1px solid #aaa;
        outline: none;

        &:focus {
            outline: 2px solid beige;
        }
    }
</style>