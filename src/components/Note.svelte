<script lang='ts'>
    import { onMount } from "svelte/internal";
    import notes from "../notesStore";

    // TODO: This is a seperate note page
    // TODO: Add HTML for note, that doesn't exist
    // TODO: Make todos editable
    export let params;
    const noteid = params.noteid
    const note = notes.get(noteid)

    let textarea : HTMLTextAreaElement;
    let nameInput : HTMLInputElement;

    const textareaAutoResize = () => {
        textarea.style.height = 'auto'
        textarea.style.height = (textarea.scrollHeight) + 'px'
    }

    const handleNameChange = () => {
        notes.changeName(noteid, nameInput.value)
    }

    const handleTextChange = () => {
        textareaAutoResize()
        notes.changeText(noteid, textarea.value)
    }

    onMount(() => {
        textareaAutoResize()
    })
</script>

<div class='wrapper'>
    <div class="note">
        <div class="header">
            <input bind:this={nameInput} on:input={handleNameChange} value={note.name}/>
        </div>
        <hr />
        <textarea spellcheck={false} rows=1 on:input={handleTextChange} bind:this={textarea} value={note.text} />
    </div>
</div>

<style lang='scss'>
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

    hr {
        margin-bottom: 1rem;
    }

    input {
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

    textarea {
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