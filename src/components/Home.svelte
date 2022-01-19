<script lang="ts">
    import { onMount } from "svelte";
    import type { INote } from "../Interfaces";
    import notes, { allTags } from "../notesStore";
    import MiniNote from './MiniNote.svelte'

    let addName : string;
    let filtertags : string;
    let filteredNotes : INote[] = $notes;
    
    const handleAdd = (e : MouseEvent) => {
        e.preventDefault()
        notes.add('', addName)
        addName = ''
    }

    const filterOut = () : void => {
        if (!filtertags) {
            filteredNotes = $notes
            return
        }

        // Filter function is to avoid empty strings e.g. '   filter tags ' => ['filter', 'tags', '']
        let tags : string[] = filtertags.split(/ +/).filter(tag => tag)
        let excluded = tags.filter(tag => tag[0] === '-').map(tag => tag.slice(1))
        let included = tags.filter(tag => tag[0] !== '-')
        filteredNotes = $notes.filter(note => {
            if (excluded.length > 0 && excluded.some(tag => note.tags.includes(tag)))
                return false
            if (included.length > 0 && !included.every(tag => note.tags.includes(tag)))
                return false
            return true
        })
    }

    onMount(() => {
        notes.subscribe(arr => {
            filterOut()
        })
    })
    // TODO: Implement filtering through tags
</script>

<svelte:head>
    <title>My Notes</title>
</svelte:head>

<div class='wrapper'>
    <div class='header'>
        <h1>My Notes</h1>
        <div>
            <input type="text" bind:value={filtertags}/>
            <button on:click={filterOut}>filter</button>
        </div>
    </div>
    <form>
        <div>
            <input placeholder="Name" bind:value={addName}/>
            <button class='btn' on:click={handleAdd}>Add</button>
        </div>
    </form>
    <div class="notes">
        {#each filteredNotes as note}
            <MiniNote {...note}/>
        {:else}
            <h2>No notes yet...</h2>
        {/each}
    </div>
</div>

<style lang='scss'>
    .header {
        padding: 1em;
        border-radius: 0 0 1rem 1rem;
        margin-bottom: .5em;
        background-color: plum;
        color: white;
        display: flex;
        justify-content: space-between;
    }

    .notes {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 1.5em;
        justify-content: space-between;
    }   
</style>