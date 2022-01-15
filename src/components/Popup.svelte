<script lang='ts'>
    import { onMount } from "svelte";

    export let x : number;
    export let y : number;

    let popup : HTMLDivElement;
    let tagname : string = '';

    // TODO: I'm not sure that this is the best way of calculating popup position, but it will do for now
    onMount(() => {
        popup.style.top = `${y}px`
        popup.style.left = `${x}px`

        if (x + popup.offsetWidth > window.innerWidth) {
            popup.style.left = `${x - popup.offsetWidth}px`
        }
    })
</script>

<div class='popup' bind:this={popup}>
    <input bind:value={tagname} />
    <button>add</button>
    <button>remove</button>
</div>

<style>
    .popup {
        position: absolute;
        padding: .2rem .5rem;
        border-radius: .5rem;
    }
</style>