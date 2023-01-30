import { Slot } from '@radix-ui/react-slot'

export function Button({classStyle, asChild, ...props}) {
    const Comp =  asChild ? Slot : 'button'
    return (
        <Comp className={`btn ${classStyle}`} {...props} ></Comp>
    )
}