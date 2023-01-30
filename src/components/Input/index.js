import { forwardRef } from 'react'

export const Input = forwardRef(({label, ...props}, ref) => {
    return (
        <div>
            <label className="form-label">{label}</label>
            <input className="form-control" {...props} ref={ref} />
        </div>
        
    )
})