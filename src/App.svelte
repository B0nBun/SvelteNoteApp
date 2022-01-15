<script lang='ts'>
    // TODO: Implement pages for seperate note viewing (/todo.id)
    // TODO: Implement tag system
    // TODO: More styling
    // TODO: Animations 
    // TODO: Markdown styling inside the notes
    //       ** <b>; __ <i>; ~~ <linethrough>; # headers; ===== line; [text](href) <a>;   
    import Router from 'svelte-spa-router'
    import Note from './Note.svelte'
    import Home from './Home.svelte'
</script>

<Router routes={{
    '/': Home,
    '/:noteid': Note,
}}/>