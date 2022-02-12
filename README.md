## This is a note web app written on [Svelte](https://svelte.dev) for practice and portfolio.

Firstly, sorry, I am no designer and couldn't come up with anything good looking. Also, I already wasted too much time on this.

### Quickstart

Install all dependencies
```
npm install
```

You can either run dev server
```
~ npm run dev
```
or build the app
```
~ npm run build
```

### Basic features

- Obviously, you can add, edit and remove notes
- There's also scuffed Markdown styling
- And tag system for filtering
> You can add tags while editing a note. In filter field you input those tags that you want in note(e.g. `tag`) or don't want (e.g. `-tag`).
So if you input `recepie -cake` you will get all notes with `recepie` tag, exculding those that contain `cake` tag

### Stack

- Svelte
- TypeScript
- That's it