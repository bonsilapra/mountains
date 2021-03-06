import React from 'react';
import backgroundImage from '../../images/aboutBackground.jpg';
import { Background } from '../commons/Background';
import '../commons/Commons.css';

export class About extends React.Component {

    constructor(props) {
        super(props)
        window.scrollTo(0,0)
    }

    render() {
        return (
            <>
            <Background image={backgroundImage}/>
            <div className="page-title">
                O MNIE
            </div>
            <div className='page-container'>
                <h1>Cześć!</h1>
                <h4>O mnie</h4>
                <p>
                    Mam na imię Asia i aktualnie mieszkam w Poznaniu. W wolnym czasie najchętniej jeżdżę w góry z moim chłopakiem Pawłem. Ze względu na odległość najczęściej bywamy w okolicach Ziemi kłodzkiej i w Karkonoszach, ale najbardziej lubię odwiedzać Tatry.
                    Od maja 2020 r. zaczęliśmy razem zdobywać szczyty z Korony Gór Polski. 
                </p>
                <p>
                    Oprócz opisów tras na szczyty z Korony Gór Polski przedstawiam również trasy na inne szczyty w polskich górach oraz do ciekawych miejsc, na które natrafiliśmy. Informacje na stronie będę uzupełniać w miarę odbywania kolejnych wycieczek. Opisy i wyznaczone trasy są przedstawione takie, jakie były w dniu naszej wycieczki - nie wprowadzam ewnetualnych zmian, które pojawiły się na szlaku później.
                </p>
                <p>
                    Wszystkie publikowane tu zdjęcia oraz opisy są mojego autorstwa. Kopiowanie i rozpowszechnianie ich bez zgody jest zabronione. Trasy wycieczek udostępnione są za pomocą portalu
                    <a href="https://mapa-turystyczna.pl/" target='_blank' rel='noreferrer'> Mapa Turystyczna</a>.

                </p>
                <h4>Kilka słów o tym projekcie</h4>
                <p>
                    Niniejsza strona powstała na potrzeby nauki programowania. Po ukończonych studiach na kierunku budownictwo na Politechnice Poznańskiej i po przepracowaniu kilku lat z zawodzie postanowiłam zmienić branżę. Jest to mój pierwszy projekt, który wykonałam wykorzystując bibliotekę React.js. 
                </p>
                <p>
                    Stworzenie tej strony nie byłoby możliwe, gdyby nie pomoc mojego brata - Kuby. Poświęcił dużo swojego czasu, żeby nauczyć mnie podstaw programowania oraz stworzyć back-end niezbędny do działania tej witryny.
                </p>
                <h4>Kontakt</h4>
                <p style={{marginBottom: 0}}>
                    Zapraszam do kontaktu przez e-mail <a href="mailto:asia.kgp@gmail.com">asia.kgp@gmail.com</a> oraz do odwiedzenia mojego profilu na Instagramie:
                </p>
                <a href="https://www.instagram.com/bonsilapra/"
                    target='_blank' 
                    rel='noreferrer'
                    aria-label='Instagram'
                    className='icon'
                >
                    <i className='fab fa-instagram' />
                </a>
                <p>
                    Znajdują się tam zdjęcia z różnych wycieczek (nie tylko w góry), moich cudownych piesków - Rico i Lusi oraz kilka innych :&#41;
                </p>
            </div>
            </>
        );
    }
}


