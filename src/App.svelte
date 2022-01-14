<script lang='ts'>
    // TODO: Make page for seperate note viewing (/todo.id)
    // TODO: More styling
    // TODO: Animations 
    import notes from "./notesStore";
    import Note from './Note.svelte'

    let addText : string;
    let addHeader : string;
    let addHeaderInput : HTMLInputElement;
    let addTextInput : HTMLInputElement;
    let changeId : string;
    let changeText : string;
    let changeIdInput : HTMLInputElement;
    let changeTextInput : HTMLInputElement;

    const handleAdd = (e : MouseEvent) => {
        e.preventDefault()
        if (!addText && !addHeader) return
        notes.add(addText, addHeader)
        addHeaderInput.value = ''
        addTextInput.value = ''
        addText = ''
        addHeader = ''
    }

    const handleChange = (e : MouseEvent) => {
        e.preventDefault()
        notes.change(changeId, changeText)
        changeIdInput.value = ''
        changeTextInput.value = ''
    }
</script>

<div class='wrapper'>
    <h1 class='header'>My Notes</h1>
    <div class="notes">
        {#each $notes as note}
            <Note {...note}/>
        {:else}
            <h2>No notes yet...</h2>
        {/each}
    </div>
    <form>
        <div>
            <input type="text" bind:this={addHeaderInput} bind:value={addHeader} placeholder='Add header'>
            <input type="text" bind:this={addTextInput} bind:value={addText} placeholder='Add text'>
            <button on:click={handleAdd}>Add</button>
        </div>
        <div>
            <input type="string" bind:this={changeIdInput} bind:value={changeId} placeholder="Change ID">
            <input type="text" bind:this={changeTextInput} bind:value={changeText} placeholder="Change text">
            <button on:click={handleChange}>Change</button>
        </div>
    </form>
</div>

<style>
    .wrapper {
        max-width: 50rem;
        margin: 0 auto;
        padding: 0 2rem;
    }

    .header {
        padding: .5em;
        border-radius: 0 0 1rem 1rem;
        margin-bottom: .5em;
        background-color: plum;
        color: white;
    }

    .notes {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1em;
        margin-bottom: 2rem;
    }
</style>