<script lang='ts'>
    import notes from './notesStore'
    export let header : string = ''
    export let text : string = ''
    export let id : string
    
    const handleRemove = (e : MouseEvent) => notes.remove(id)
</script>

<div class='note'>
    <a href={`/#/${id}`} class='muted'>{id}</a>
    {#if header}
        <h3 class='header'>{header}</h3>
    {/if}
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
    .text, .header {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>