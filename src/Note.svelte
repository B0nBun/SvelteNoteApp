<script lang='ts'>
import notes from "./notesStore";

// TODO: This is a seperate note page
// TODO: Add HTML for note, that doesn't exist
// TODO: Make todos editable
export let params : any = {};
const noteid : string = params.noteid
const note = notes.get(noteid)
</script>

<div class='wrapper'>
    <div class="note">
        <div class="header">
            <h1>{note.header}</h1>
            <div class="muted">{note.id}</div>
        </div>
        <hr />
        <p>
            {note.text}
        </p>
    </div>
</div>

<style>
    .note {
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
        width: 100%;
        border-radius: .5rem;
        padding: 1rem 2rem;
        box-shadow: 0 7px 20px #aaa;
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>