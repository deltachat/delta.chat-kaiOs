# delta.chat-kaiOs

[Work in Progress & Experimental] DeltaChat on KaiOS

You will need a rooted phone to run it when its done

## Build

requirements:

- nodejs >= 16
- rustup

```sh
git submodule update --recursive --init
```

```sh
npm i
npm run build:backend:types
```

to build

```sh
npm run build
```

to package

```sh
npm run build
node package.mjs
```

to format the code

```sh
npm run fix-formatting
```

## Development

First open a new seperate terminal and start the native backend -> look into [dc_cmd_api/README.MD](dc_cmd_api/README.MD) for instructions, though in essence its just:

```sh
cd dc_cmd_api && RUST_LOG=info cargo run --features webserver
```

Then run `npm run dev` and enable the mobile view for firefox (`ctrl` + `shift` + `m`) or (`command` + `option` + `m` on macOS).

Add a configuration for your phone into the mobild view and select it. (only the dimensions are important)

Examples:

```
N8110-4G 240 x 384
```

For closest-to-real experience make sure you have all the fonts from `development/fonts/` installed on your computer.

## Packaging

```
npm run build
node package.mjs
```

(TODO): add an option to exclude the source maps (this will save much space)

If you want to load the app over WebIDE run the package command,
but select the dist folder instead of the omnisd file.

## used stuff / usefull links

- https://support.delta.chat/t/delta-chat-for-kaios/684
- https://preactjs.com/guide/v10/getting-started
- https://developer.kaiostech.com/design-guide/ui-component

## Tips

### For vs-code users

Make sure the used tsypesript version is the workspace version and not the globaly installed one.
