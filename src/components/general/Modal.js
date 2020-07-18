import React from 'react'

function Modal() {
    return (
        <div className="modal">
            <div className="modal__inner">
                <h2
                    className="section-title section-title--blue section-title--less-margin"
                >
                    <img src="../../img/nature.jpg" className="section-title__icon" />
                    Хамт <strong> аялах </strong>
                </h2>

                <div className="wrapper wrapper-narrow">
                    <p className="modal__description">
                        Бид тун удахгүй онлайнаар захиалга өгөх системийг нээх бөгөөд, та одоогоор доорхи сошиал 
                        платформуудаар дамжуулж бидэнтэй холбогдох боломжтой 
                    </p>
                </div>
                
            </div>
            
        </div>
    )
}

export default Modal
