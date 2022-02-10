<script lang="ts">
    import { onMount } from "svelte";
    import type { INote } from "../Interfaces";
    import notes from "../notesStore";
    import MiniNote from './MiniNote.svelte'

    let addName : string;
    let filterStr : string;
    let filteredNotes : INote[] = $notes;
    
    const handleAdd = (e : MouseEvent) : void => {
        notes.add('', addName)
        addName = ''
    }

    const filterOut = () : void => {
        if (!filterStr) {
            filteredNotes = $notes
            return
        }

        // Filter function is to avoid empty strings e.g. '   filter tags ' => ['filter', 'tags', '']
        let filterTags : string[] = filterStr.split(/ +/).filter(tag => tag)
        let excluded : string[] = filterTags.filter(tag => tag[0] === '-').map(tag => tag.slice(1))
        let included : string[] = filterTags.filter(tag => tag[0] !== '-')
        filteredNotes = $notes.filter((note : INote) => {
            if (excluded.length > 0 && excluded.some(tag => note.tags.includes(tag)))
                return false
            if (included.length > 0 && !included.every(tag => note.tags.includes(tag)))
                return false
            return true
        })
    }

    const handleEscape = (e : KeyboardEvent) : void => {
        if (e.key === 'Escape') {
            filterStr = ''
            filterOut()
        }
    }

    onMount(() : () => void => {
        notes.subscribe(filterOut)
        window.addEventListener('keydown', handleEscape)

        return () => window.removeEventListener('keydown', handleEscape)
    })
</script>

<svelte:head>
    <title>My Notes</title>
</svelte:head>

<div class='wrapper'>
    <div class='header'>
        <h1>My Notes</h1>
        <form>
            <input class='with-shadow inpt' type="text" bind:value={filterStr}/>
            <button class='with-shadow btn' on:click|preventDefault={filterOut}>filter</button>
        </form>
    </div>
    <div class="body">
        <form>
            <input class='inpt' placeholder="Name" bind:value={addName}/>
            <button class='btn' on:click|preventDefault={handleAdd}>Add</button>
        </form>
        <div class="notes">
            {#each filteredNotes as note}
                <MiniNote {...note}/>
            {:else}
                <h2>No notes...</h2>
            {/each}
        </div>
    </div>
</div>

<style lang='scss'>
    .header {
        padding: 1em;
        border-radius: 0 0 1rem 1rem;
        margin-bottom: .5em;
        background-color: var(--primary);
        color: white;
        display: flex;
        justify-content: space-between;
    }

    .body {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .notes {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 1.5em;
        justify-content: space-between;
    }   
</style>