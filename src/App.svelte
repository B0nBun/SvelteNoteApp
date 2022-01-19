<script lang='ts'>
    // DONE: Seperate note viewing
    // DONE: Note editing

    // TODO: Implement tag system
        // TODO: Improve popups (Maybe change them to modals, or just regular elements, that are hidden until needed)
    // TODO: More styling
        // TODO: Colors and general styling can be taken from Svelte
        // TODO: Make site more adaptive
        // TODO: Add icons
    // TODO: Animations 
    // TODO: Add some hotkeys for going back, clearing filtering etc.
    // TODO: Markdown styling inside the notes
    //       ** <b>; __ <i>; ~~ <linethrough>; # headers; ===== line; [text](href) <a>;   
    // TODO: Ctrl+Z for note editing
    import Router from 'svelte-spa-router'
    import Note from './components/Note.svelte'
    import Home from './components/Home.svelte'
</script>

<Router routes={{
    '/': Home,
    '/:noteid': Note,
}}/>