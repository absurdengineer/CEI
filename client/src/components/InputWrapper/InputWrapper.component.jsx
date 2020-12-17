import React from 'react'

const InputWrapper = (props) => {
    const {label, children} = props
    return ( 
        <div className="mb-3">
            <label className="form-label">{label}</label>
            {children}
        </div>
     );
}

export default InputWrapper;