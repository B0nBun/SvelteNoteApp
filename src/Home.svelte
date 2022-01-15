<script lang="ts">
    import notes from "./notesStore";
    import MiniNote from './MiniNote.svelte'

    let addName : string;
    
    const handleAdd = (e : MouseEvent) => {
        e.preventDefault()
        notes.add('', addName)
        addName = ''
    }
</script>

<div class='wrapper'>
    <h1 class='header'>My Notes</h1>
    <div class="notes">
        {#each $notes as note}
            <MiniNote {...note}/>
        {:else}
            <h2>No notes yet...</h2>
        {/each}
    </div>
    <form>
        <div>
            <input placeholder="Name" bind:value={addName}/>
            <button on:click={handleAdd}>Add</button>
        </div>
    </form>
</div>

<style>
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