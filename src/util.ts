
export function debounce<TParam>(fn: (...params : TParam[]) => void, millis:number):(...params : TParam[])=>void{
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
