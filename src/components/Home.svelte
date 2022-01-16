<script lang="ts">
    import { onMount } from "svelte";
    import type { INote } from "../Interfaces";
    import notes, { allTags } from "../notesStore";
    import MiniNote from './MiniNote.svelte'
    import Popup from './Popup.svelte'

    let addName : string;
    let isFilterOpen : boolean = false;
    let filterButton : HTMLButtonElement;
    let filtertags : string;
    let filteredNotes : INote[] = $notes;
    
    const handleAdd = (e : MouseEvent) => {
        e.preventDefault()
        notes.add('', addName)
        addName = ''
    }

    const openFilter = () => isFilterOpen = true
    const closeFilter = () => isFilterOpen = false

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
            if (excluded.length > 0 && note.tags.some(tag => excluded.includes(tag))) {
                return false
            }
            if (included.length > 0 && !note.tags.some(tag => included.includes(tag))) {
                return false
            }
            return true
        })
        console.log(filteredNotes)
    }

    onMount(() => {
        window.addEventListener('click', closeFilter)
        notes.subscribe(arr => {
            filterOut()
        })

        return () => window.removeEventListener('click', closeFilter)
    })
    // TODO: Implement filtering through tags
</script>

<svelte:head>
    <title>My Notes</title>
</svelte:head>

<div class='wrapper'>
    <div class='header'>
        <h1>My Notes</h1>
        <button bind:this={filterButton} on:click|stopPropagation={openFilter}>Filter</button>
        {#if isFilterOpen}
            <Popup x={filterButton.getBoundingClientRect().left} y={filterButton.getBoundingClientRect().top}>
                <input type="text" bind:value={filtertags}/>
                <button on:click={filterOut}>filter</button>
            </Popup>
        {/if}
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