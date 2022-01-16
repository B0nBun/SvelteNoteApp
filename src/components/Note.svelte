<script lang='ts'>
    import { onMount } from "svelte/internal";
    import { trimm } from "../utils";
    import Popup from './Popup.svelte'
    import notes, { allTags } from "../notesStore";

    // TODO: This is a seperate note page
    // TODO: Add HTML for note, that doesn't exist
    export let params;
    const noteid = params.noteid
    let note = notes.get(noteid)

    let isPopupOpen : boolean = false;
    let popupButton : HTMLButtonElement;
    let textarea : HTMLTextAreaElement;
    let nameInput : HTMLInputElement;
    let tagname : string;
    let tagSpaceError : boolean = false;
    let tagDashError : boolean = false;

    const closePopup = () => isPopupOpen = false
    const openPopup = () => isPopupOpen = true
    
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

    const handleTagAdd = () => {
        tagname = trimm(tagname)
        if (!tagname) return
        if (tagname.match(/ /)) {
            tagDashError = false
            tagSpaceError = true
            return
        }
        if (tagname.match(/^-/)) {
            tagSpaceError = false
            tagDashError = true
            return
        }
        notes.addTag(noteid, tagname)
        note.tags = notes.get(noteid).tags
        tagSpaceError = false
        tagDashError = false
        tagname = ''
    }
    
    const handleTagRemove = () => {
        tagname = trimm(tagname)
        if (!tagname) return
        notes.removeTag(noteid, tagname)
        note.tags = notes.get(noteid).tags
        tagSpaceError = false
        tagDashError = false
        tagname = ''
    }
    
    onMount(() => {
        textareaAutoResize()
        window.addEventListener('click', closePopup)

        return () => window.removeEventListener('click', closePopup)
    })
</script>

<svelte:head>
    <title>{note.name}</title>
</svelte:head>

<div class='wrapper'>
    <div class="note">
        <div class="header">
            <input class='name' bind:this={nameInput} on:input={handleNameChange} value={note.name}/>
            <button class='btn' bind:this={popupButton} on:click|stopPropagation={openPopup}>...</button>
        </div>

        {#if isPopupOpen}
            <Popup x={popupButton.getBoundingClientRect().left} y={popupButton.getBoundingClientRect().top}>
                {#if tagDashError}
                    <p style='color: red'>Tagname shouldn't start with dash</p>
                {/if}
                {#if tagSpaceError}
                    <p style='color:red'>Tagname shouldn't have spaces in it</p>
                {/if}
                <input placeholder='Tag' bind:value={tagname} />
                <button on:click={handleTagAdd} class='btn'>add</button>
                <button on:click={handleTagRemove} class='btn'>remove</button>
            </Popup>
        {/if}

        <hr />
        <textarea class='text' spellcheck={false} rows=1 on:input={handleTextChange} bind:this={textarea} value={note.text} />
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

    hr {
        margin-bottom: 1rem;
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