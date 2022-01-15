<script lang='ts'>
import Note from './Note.svelte';

    import notes from './notesStore'
    export let name : string = ''
    export let text : string = ''
    export let id : string
    
    const handleRemove = (e : MouseEvent) => notes.remove(id)
</script>

<div class='note'>
    <a href={`/#/${id}`} class='muted'>{id}</a>
    <h3 class='name'>{name}</h3>
    {#if text}
        <p class='text'>{text}</p>
    {/if}
    <p on:click={handleRemove} class='muted'>Remove</p>
</div>

<style>
    .note {
        border-radius: .2rem;
        padding: .5rem 1rem;
        box-shadow: 0 7px 10px #aaa;
        max-width: 25%;
        display: flex;
        height: fit-content;
        flex-direction: column;
        justify-content: space-between;
        gap: .5rem;
    }

    /* TODO: Not sure if this is the best solution for overflow, will need to think about that */
    .text, .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>