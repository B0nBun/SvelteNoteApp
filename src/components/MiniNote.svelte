<script lang='ts'>
    import notes from '../notesStore'

    export let name : string = ''
    export let text : string = ''
    export let id : string
    export let tags : string[] = []
    // export let tags : string[] = []    

    const handleRemove = (e : MouseEvent) => notes.remove(id)
</script>

<div class='note'>
    <a href={`/#/${id}`} class='muted'>{id}</a>
    <h3 class='name'>{name}</h3>
    <p class='text'>{text}</p>
    <p>{tags.join('; ')}</p>
    <p on:click={handleRemove} class='muted'>Remove</p>
</div>

<style lang='scss'>
    .note {
        border-radius: .2rem;
        padding: .5rem 1rem;
        box-shadow: 0 7px 10px #aaa;
        display: flex;
        height: fit-content;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        gap: .5rem;

        &:nth-child(12n+1),
        &:nth-child(12n+6),
        &:nth-child(12n+7),
        &:nth-child(12n) {
            grid-column: span 2;
        }
    }


    .text {
        min-height: 1.5em;
    }

    .name {
        min-height: 1.5em;
    }
    
    /* TODO: Not sure if this is the best solution for overflow, will need to think about that */
    .text, .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>