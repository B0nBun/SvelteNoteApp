<script lang='ts'>
    import notes from '../notesStore'
    import { fade } from 'svelte/transition'

    export let name : string = ''
    export let text : string = ''
    export let id : string
    export let tags : string[] = []

    const handleRemove = (e : MouseEvent) => notes.remove(id)
    const handleKeyDownRemove = (e : KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            notes.remove(id)
        }
    }
</script>

<a tabindex="0" href={`/#/${id}`} class='note'>
    <h3 class='name'>{name}</h3>
    <p class='text'>{text}</p>
    <p class='muted tags'>tags: {tags.join(' ')}</p>
    <p
        tabindex="0"
        on:click|stopPropagation|preventDefault={handleRemove}
        on:keydown|stopPropagation={handleKeyDownRemove}
        class='remove-note muted'
    >Remove</p>
</a>

<style lang='scss'>
    .note {
        text-decoration: none;
        color: var(--elevated5);
        border-radius: .5rem;
        padding: .5rem 1rem;
        box-shadow: 0 5px 12px -5px black;
        display: flex;
        height: fit-content;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        gap: .5rem;
        cursor: pointer;

        transition: transform ease-out .2s;
    }

    @media (max-width: 25rem) {
        .note {
            grid-column: span 4;
        }
    }

    .note:hover, .note:focus {
        transform: scale(1.05);
    }


    .text {
        min-height: 1.5em;
    }

    .name {
        min-height: 1.5em;
    }
    
    /* TODO: Not sure if this is the best solution for overflow, will need to think about that */
    .text, .name, .tags {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .remove-note {
        width: min-content;
        font-size: .8em;
    }

    .remove-note:hover, .remove-note:focus {
        color: var(--secondary);
        font-weight: 600;
    }
</style>