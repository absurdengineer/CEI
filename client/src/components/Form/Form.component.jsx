import React from 'react'

const Form = ({handleSubmit, children}) => {
    return ( 
        <form onSubmit={handleSubmit}>
            {children}
        </form>
     );
}

export default Form;