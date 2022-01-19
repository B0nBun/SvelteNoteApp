<script lang='ts'>
    import { onMount } from "svelte/internal";
    import { trimm } from "../utils";
    import notes, { allTags } from "../notesStore";

    // TODO: This is a seperate note page
    // TODO: Add HTML for note, that doesn't exist
    export let params;
    const noteid = params.noteid
    let note = notes.get(noteid)

    let textarea : HTMLTextAreaElement;
    let nameInput : HTMLInputElement;
    let tagnames : string;
    let tagDashError : boolean = false;
    
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
        tagnames = trimm(tagnames)
        if (!tagnames) return
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
    
    const handleTagRemove = () => {
        tagnames = trimm(tagnames)
        if (!tagnames) return
        let tags = tagnames.split(/ +/)
        tags.map(tag => {
            notes.removeTag(noteid, tag)
        })
        note.tags = notes.get(noteid).tags
        tagDashError = false
        tagnames = ''
    }
    
    onMount(() => {
        textareaAutoResize()
    })
</script>

<svelte:head>
    <title>{note.name}</title>
</svelte:head>

<div class='wrapper'>
    <div class="note">
        <div class="header">
            <input class='name' bind:this={nameInput} on:input={handleNameChange} value={note.name}/>
            <div class='tag-box'>
                {#if tagDashError}
                    <p style='color: red'>Tagname shouldn't start with dash</p>
                {/if}
                <input placeholder='Tag' bind:value={tagnames} />
                <button on:click={handleTagAdd} class='btn'>add</button>
                <button on:click={handleTagRemove} class='btn'>remove</button>
            </div>
        </div>
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