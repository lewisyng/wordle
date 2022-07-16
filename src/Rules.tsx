import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import './Rules.scss';

export const Rules = () => {
    const [showRules, setShowRules] = useState(
        !localStorage.getItem('rulesWereRead')
    );

    const closeModal = () => {
        localStorage.setItem('rulesWereRead', 'true');
        setShowRules(false);
    };

    const modalStyles = {
        content: {
            width: '40vw',
            background: 'white',
            borderRadius: '10px',
            padding: '1rem 1rem 2rem 1rem',
            inset: 'auto',
        },
        overlay: {
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    };

    return (
        <Modal
            isOpen={showRules}
            onRequestClose={closeModal}
            style={modalStyles}
            contentLabel="Info"
        >
            <div className="rules__header">
                <h1>Info</h1>
            </div>

            <div className="rules__content">
                <p>
                    Errate das <strong>Wördl </strong>
                    in 6 Versuchen!
                </p>

                <p>
                    Das Ziel des Spiels ist, ein Wort mit 5 Buchstaben zu
                    erraten. Die Umlaute Ä, Ö und Ü wurden durch AE, OE bzw. UE
                    ersetzt, und ẞ durch SS. Gib ein Wort ein und drück auf das
                    Häkchen links unten, um es zu überprüfen.
                </p>
                <p>
                    Nach jedem Versuch erhältst du einen Hinweis dazu, wie viele
                    Buchstaben du richtig erraten hast.
                </p>

                <p>
                    Diese Farbcodes helfen dir beim Finden des richtigen Wortes:
                </p>
                <p>E : Das E ist an der richtigen Stelle.</p>
                <p>
                    N : Das N ist im Lösungswort enthalten, aber an einer
                    anderen Stelle. (Das gilt auch für das zweite E.)
                </p>
                <p>G , R : G und R kommen im Lösungswort gar nicht vor.</p>
                <p>Jeden Tag wartet ein neues Rätsel auf dich!</p>
            </div>
        </Modal>
    );
};

export function showRules() {
    const rulesEl = document.createElement('div');
    rulesEl.classList.add('rules__container');
    document.querySelector('body').appendChild(rulesEl);

    const domContainer = document.querySelector('.rules__container');
    const root = ReactDOM.createRoot(domContainer);
    root.render(<Rules />);
}
