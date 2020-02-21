export function debounce<TParams extends Array<any>>(fn: (...params : TParams) => void, millis:number):(...params : TParams)=>void{
    let isScheduled=false;

    return (...params) => {
        if(isScheduled) return
        isScheduled = true
        setTimeout(() => {
            isScheduled = false
            fn(...params)
        }, millis)
    }
}

export type PreactProps = Readonly<import("preact").Attributes & { children?: import("preact").ComponentChildren; ref?: import("preact").Ref<any>; }>