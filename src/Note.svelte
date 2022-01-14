<script lang='ts'>
import notes from './notesStore'
export let header : string = ''
export let text : string = ''
export let id : string

const handleRemove = (e : MouseEvent) => notes.remove(id)
const handleCopy = (e : MouseEvent) => navigator.clipboard.writeText(id)
</script>

<div class='note'>
    <p on:click={handleCopy} class='muted'>{id}</p>
    <h3 class='header'>{header}</h3>
    <p>{text}</p>
    <p on:click={handleRemove} class='muted'>Remove</p>
</div>

<style>
    .note {
        border-radius: .2rem;
        padding: .5rem 1rem;
        box-shadow: 0 7px 10px #aaa;
        max-width: 300px;
        display: flex;
        height: fit-content;
        flex-direction: column;
        justify-content: space-between;
        gap: .5rem;
    }

    .muted {
        font-size: .8rem;
        opacity: .7;
        cursor: pointer;
        align-self: flex-start;
    }

    .muted:hover {
        text-decoration: underline;
        opacity: .9;
    }
</style>