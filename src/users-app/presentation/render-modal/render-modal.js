import './render-modal.css';
import modalHTML from './render-modal.html?raw';

let modal,form;

export const showModal = () => {
    modal?.classList.remove('hide-modal');
}

export const hideModal = () => {
//reset de formulario
    modal?.classList.add('hide-modal');
}

export const renderModal = (element) => {

    if(modal)
        return;
        
    modal = document.createElement('div');
    modal.innerHTML = modalHTML;
    modal.className = 'modal-container hide-modal';
    form = modal.querySelector('form');
    
    modal.addEventListener('click', (event) => {
        if(event.target.classList.contains('modal-container')){
            hideModal();
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
    })

    element.append(modal);
}