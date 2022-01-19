<script lang='ts'>
    import { onMount } from "svelte/internal";
    import { trimm } from "../utils";
    import notes from "../notesStore";

    // TODO: This is a seperate note page
    // TODO: Add HTML for note, that doesn't exist
    export let params : {noteid: string};
    const noteid = params.noteid
    let note = notes.get(noteid)
    let noteStates : string[] = []

    let textarea : HTMLTextAreaElement;
    let nameInput : HTMLInputElement;
    let tagnames : string;
    let tagDashError : boolean = false;
    
    const textareaAutoResize = () : void => {
        textarea.style.height = 'auto'
        textarea.style.height = (textarea.scrollHeight) + 'px'
    }

    const handleNameChange = () : void => {
        notes.changeName(noteid, nameInput.value)
    }

    const handleInput = () : void => {
        textareaAutoResize()
        notes.changeText(noteid, textarea.value)
    }

    const handleTextareaKeydown = (e : KeyboardEvent) : void => {
        // TODO: Should think about how to implement Ctrl+Z in a better way
        if (['Enter', 'Escape', ' ', 'Tab'].includes(e.key)) {
            noteStates.push(note.text)
        }

        if (e.key === 'z' && e.ctrlKey) {
            note.text = noteStates.pop() || note.text
            notes.changeText(noteid, textarea.value)
            textareaAutoResize()
        }
    }

    const handleTagAdd = () : void => {
        if (!tagnames) return
        tagnames = trimm(tagnames)
        let tags = tagnames.split(/ +/)
        if (tags.some(tag => tag.match(/^-/))) {
            tagDashError = true
            return
        }

        tags.map(tag => {
            notes.addTag(noteid, tag)
        })
        note.tags = notes.get(noteid).tags
        tagDashError = false
        tagnames = ''
    }
    
    const handleTagRemove = () : void => {
        if (!tagnames) return
        tagnames = trimm(tagnames)
        let tags = tagnames.split(/ +/)
        tags.map(tag => {
            notes.removeTag(noteid, tag)
        })
        note.tags = notes.get(noteid).tags
        tagDashError = false
        tagnames = ''
    }
    
    const handleEscape = (e : KeyboardEvent) : void => {
        if (e.key === 'Escape') {
            if (textarea === document.activeElement) {
                textarea.blur()
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
                <input placeholder='Tag' bind:value={tagnames} />
                <button on:click|preventDefault={handleTagAdd} class='btn'>add</button>
                <button on:click|preventDefault={handleTagRemove} class='btn'>remove</button>
            </form>
        </div>
        <hr />
        <textarea class='text' spellcheck={false} rows=1 on:keydown={handleTextareaKeydown} on:input={handleInput} bind:this={textarea} bind:value={note.text} />
        <span class='muted'>{note.tags.join('; ')}</span>
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