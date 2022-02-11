<script lang='ts'>
    // DONE: Seperate note viewing
    // DONE: Note editing
    // DONE: Implement tag system

    // TODO: More styling
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