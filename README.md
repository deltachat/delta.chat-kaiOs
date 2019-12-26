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

## Development

run `npm run watch -- --open` and enable the mobile view for firefox (`ctrl` + `shift` + `m`).

Add a configuration for your phone into the mobild view and select it. (only the dimensions are important)

Examples:
```
N8110-4G 240 x 384
```

## Key assignment
### chat-list
- cursor up/down to 
- enter to enter in chat
### chat
- soft left/right to scroll
- enter send message
- longpress enter to add attachment
- if the attachment panel is open and you don't want to take any action, you can close it with backspace 
- backspace come back to chat-list


## used stuff / usefull links
- https://support.delta.chat/t/delta-chat-for-kaios/684
- https://preactjs.com/guide/v10/getting-started
- https://developer.kaiostech.com/design-guide/ui-component