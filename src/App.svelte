<script lang='ts'>
    // TODO: Implement tag system
    // TODO: More styling
    // TODO: Animations 
    // TODO: Markdown styling inside the notes
    //       ** <b>; __ <i>; ~~ <linethrough>; # headers; ===== line; [text](href) <a>;   
    import Router from 'svelte-spa-router'
    import Note from './components/Note.svelte'
    import Home from './components/Home.svelte'
</script>

<Router routes={{
    '/': Home,
    '/:noteid': Note,
}}/>