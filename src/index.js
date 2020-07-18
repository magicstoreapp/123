import React, { Suspense } from 'react'
import { render } from 'react-dom';
import Add from './components/Add';

import './styles/style.css';
import './i18next';

import { useTranslation } from 'react-i18next';
import Modal from './components/general/Modal';

//alert('dfsdfsd');


function App() {
    const { t, i18n } = useTranslation();
    return (
        <div className="main-container">
<Modal />

            <div className="mobile-menu">
                <input type="checkbox" className="toggler" />
                <div className="hamburger"><div></div></div>
                <div className="menu">
                    <div>
                        <div>
                            <ul>
                                <li><a href="fake_url">Эхлэл.</a></li>
                                <li><a href="fake_url">Бидний тухай</a></li>
                                <li><a href="fake_url">Үйлчилгээ.</a></li>
                                <li><a href="fake_url">Холбоо барих</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <head>
                <div className="container">

                </div>
            </head>
            Энэ бол react App -ийн эхлэл хуудас!
            <Add />
            {t('Home.1')}
        </div>
    )
}

render(
    <Suspense fallback={(<div>~~~~~~</div>)}>
        <App />
    </Suspense>, document.getElementById("root"));


