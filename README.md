# delta.chat-kaiOs
[Work in Progress & Experimental] DeltaChat on KaiOS

You will need a rooted phone to run it when its done

## Build

requirement is nodejs >= 10

```sh
npm i
```

to build
```sh
npm run build
```

to package
```sh
npm run package
```

to format the code
```sh
npm run fix-formatting
```

## Development

run `npm run watch -- --open` and enable the mobile view for firefox (`ctrl` + `shift` + `m`).

Add a configuration for your phone into the mobild view and select it. (only the dimensions are important)

Examples:
```
N8110-4G 240 x 384
```


For closest-to-real experience make sure you have all the fonts from `development/fonts/` installed on your computer.

## Packaging

```
npm run package
```

(TODO): add an option to exclude the source maps (this will save much space)

If you want to load the app over WebIDE run the package command,
but select the dist folder instead of the `build/delta.chat.zip` file.


## used stuff / usefull links
- https://support.delta.chat/t/delta-chat-for-kaios/684
- https://preactjs.com/guide/v10/getting-started
- https://developer.kaiostech.com/design-guide/ui-component