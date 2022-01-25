<script lang='ts'>
    // DONE: Seperate note viewing
    // DONE: Note editing
    // DONE: Implement tag system

    // TODO: Markdown styling inside the notes
        // TODO: Merge textarea and styled markdown text
        // TODO: Add cursor to merged area
        // TODO: Highlighting
    // TODO: More styling
        // TODO: Colors and general styling can be taken from Svelte
        // TODO: Make site more adaptive
        // TODO: Add icons
        // TODO: Don't forget title favicon!
    // TODO: Animations

    import Router from 'svelte-spa-router'
    import Note from './components/Note.svelte'
    import Home from './components/Home.svelte'
</script>

<Router routes={{
    '/': Home,
    '/:noteid': Note,
}}/>