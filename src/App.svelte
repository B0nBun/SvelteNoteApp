<script lang='ts'>
	import notes from "./notesStore";
	let addText : string;
	let addInput : HTMLInputElement;
	let changeId : string;
	let changeText : string;
	let changeIdInput : HTMLInputElement;
	let changeTextInput : HTMLInputElement;
	let removeId : string;
	let removeInput : HTMLInputElement;

	const handleAdd = (e : MouseEvent) => {
		e.preventDefault()
		notes.add(addText)
		addInput.value = ''
	}

	const handleChange = (e : MouseEvent) => {
		e.preventDefault()
		notes.change(changeId, changeText)
		changeIdInput.value = ''
		changeTextInput.value = ''
	}

	const handleRemove = (e : MouseEvent) => {
		e.preventDefault()
		notes.remove(removeId)
		removeInput.value = ''
	}

</script>

<div>
	<pre>
		{JSON.stringify($notes, null, 2)}
	</pre>
	<form>
		<div>
			<input type="text" bind:this={addInput} bind:value={addText} placeholder='Add text'>
			<button on:click={handleAdd}>Add</button>
		</div>
		<div>
			<input type="string" bind:this={changeIdInput} bind:value={changeId} placeholder="Change ID">
			<input type="text" bind:this={changeTextInput} bind:value={changeText} placeholder="Change text">
			<button on:click={handleChange}>Change</button>
		</div>
		<div>
			<input type='text' bind:this={removeInput} bind:value={removeId} placeholder="remove ID">
			<button on:click={handleRemove}>Remove</button>
		</div>
	</form>
</div>