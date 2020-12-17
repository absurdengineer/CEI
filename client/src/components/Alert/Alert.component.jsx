import React from 'react'

const Alert = ({res_text, res_code}) => {
    return ( 
        <div className={'alert alert-dismissible fade show mt-3 '.concat(res_code === 200 ?'alert-success' :'alert-warning')} role="alert">
            <strong>{res_text}</strong>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
     );
}

export default Alert;