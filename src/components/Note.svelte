<script lang='ts'>
    import type { INote } from '../Interfaces'
    import { tick, onMount } from "svelte/internal";
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
    let isMarkdownPage : boolean = false;
    
    const textareaAutoResize = async () : Promise<void> => {
        await tick()
        noteArea.style.height = 'auto'
        noteArea.style.height = (noteArea.scrollHeight) + 'px'
    }

    const handleNameChange = () : void => {
        notes.changeName(noteid, nameInput.value)
    }

    const handleInput = () : void => {
        // Saves note state if the last change was made 200ms ago
        clearTimeout(undoTimer)
        let prevState = noteArea.value
        undoTimer = setTimeout(() => {
            noteStates.push(prevState)
        }, 350)

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
    
    const handleTagsRemove = (tag : string) : void => {
        notes.removeTag(noteid, tag)
        note.tags = notes.get(noteid).tags
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
            <div class="name-box">
                <input class='name inpt' bind:this={nameInput} on:input={handleNameChange} value={note.name}/>
            </div>
            <form class='tag-box'>
                {#if tagDashError}
                    <p style='color: red'>Tagname shouldn't start with dash</p>
                {/if}
                <input class='inpt' placeholder='Tag' bind:value={tagsStr} />
                <button class='btn' on:click|preventDefault={handleTagsAdd}>add</button>
            </form>
        </div>
        <hr />
        <div class="page-select">
            <button class='page-select-edit' class:active={!isMarkdownPage} on:click="{() => {isMarkdownPage = false; textareaAutoResize()}}">Edit</button>
            <button class='page-select-markdown' class:active={isMarkdownPage} on:click="{() => isMarkdownPage = true}">Markdown</button>
        </div>
        {#if isMarkdownPage}
            <pre class='markdown-text'>
                {@html parseTextToMarkdown(sanitize(note.text))}
            </pre>
        {:else}
            <textarea
                class='textarea'
                spellcheck={false} rows=1
                on:keydown={handleTextareaKeydown}
                on:input={handleInput}
                bind:this={noteArea}
                bind:value={note.text}
            />
        {/if}
        <div>
            {#each note.tags as tag}
                <span class="tag" on:click="{() => handleTagsRemove(tag)}">{tag}; </span>
            {/each}
        </div>
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
        margin-bottom: 1rem;
    }
    
    .name-box {
        display: flex;
        justify-content: center;
    }
    
    .name {
        font-size: 1.5rem;
        font-weight: bold;
        border: 1px solid transparent;
        border-radius: .2rem;
        outline: none;
        height: min-content;

        &:focus {
            border: 1px solid #aaa;
            outline: none;
        }
    }

    .tag-box {
        display: flex;
        gap: .5rem;
        flex-wrap: wrap;
        justify-content: center;
        * {
            height: min-content;
        }
    }

    .tag {
        cursor: pointer;
        opacity: .7;
        &:hover {
            opacity: .85;
            text-decoration: underline;
        }
    }

    hr {
        margin-bottom: 1rem;
    }

    .textarea, .markdown-text {
        font-size: 1.2rem;
        border: 1px solid #aaa;
        outline: none;
        min-height: 5em;
    }
    
    .textarea {
        resize: none;
        overflow-y: hidden;

        &:focus {
            outline: 2px solid beige;
        }
    }

    .page-select {
        display: flex;
        gap: 0;
        width: min-content;
        background-color: #4f4f4f;
        border-radius: .5rem .5rem 0 0;
        
        button {
            border-bottom: none;
            border-radius: 0;
        }

        .page-select-edit {
            border-radius: .5rem 0 0 0;   
        }
        
        .page-select-markdown {
            border-radius: 0 .5rem 0 0;   
        }
    }

    .active {
        background-color: var(--secondary);
        color: white;
    }
</style>