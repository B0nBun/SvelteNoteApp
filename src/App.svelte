<script lang='ts'>
    // DONE: Seperate note viewing
    // DONE: Note editing
    // DONE: Implement tag system

    // TODO: Markdown styling inside the notes
        // TODO: Highlighting
        // TODO: Add hotkey (Ctrl + Shift) for switching between `Edit` and `Markdown` tabs
    // TODO: More styling
        // TODO: Colors and general styling can be taken from Svelte
        // TODO: Make site more adaptive
        // TODO: Add icons
        // TODO: Don't forget title favicon!
    // TODO: Add button for help and UI explanation if needed
    // TODO: Animations

    import Router from 'svelte-spa-router'
    import Note from './components/Note.svelte'
    import Home from './components/Home.svelte'
</script>

<Router routes={{
    '/': Home,
    '/:noteid': Note,
}}/>