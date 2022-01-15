<script lang='ts'>
    import { onMount } from "svelte";
    import notes from "../notesStore";

    export let x : number;
    export let y : number;

    let popup : HTMLDivElement;

    // TODO: I'm not sure that this is the best way of calculating popup position, but it will do for now
    onMount(() => {
        popup.style.top = `${y}px`
        popup.style.left = `${x}px`

        if (x + popup.offsetWidth > window.innerWidth) {
            popup.style.left = `${x - popup.offsetWidth}px`
        }
    })
</script>

<div class='popup' bind:this={popup} on:click|stopPropagation>
    <slot></slot>
</div>

<style>
    .popup {
        position: absolute;
        padding: .5rem 1rem;
        border-radius: .5rem;
        background-color: #fff;
        box-shadow: 0 5px 10px #aaa;

        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: space-around;
        flex-wrap: wrap;
    }
</style>