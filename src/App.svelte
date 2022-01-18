<script lang='ts'>
    // DONE: Seperate note viewing
    // DONE: Note editing

    // TODO: Implement tag system
        // TODO: Improve popups 
    // TODO: More styling
    // TODO: Animations 
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