import { User } from '../../models/user';
import { getUserById } from '../../usecases/get-user-by-id';
import './render-modal.css';
import modalHTML from './render-modal.html?raw';

let modal,form;
let loadedUser = {};

export const showModal = async( id ) => {
    modal?.classList.remove('hide-modal');
    loadedUser = {};
    if(!id) return;

    const user = await getUserById( id );
}

export const hideModal = () => {
//reset de formulario
    modal?.classList.add('hide-modal');
    form?.reset();
}

const setFormValues = ( user ) => {
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lasttName"]').value = user.firstName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    loadedUser = user;
}

export const renderModal = (element , callback) => {

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

    form.addEventListener('submit', async(event) => {
        const formData = new FormData( form );
        const userLike = {...loadedUser};

       for(const [key,value] of formData)
        {   
            if(key==='balance')
            {userLike[key] = +value;
                continue;
            }

            if(key==='isActive')
            {userLike[key] = value === 'on' ? true : false;
                continue;
            }

            userLike[key] = value;
        } 

        await callback(userLike);
        
        hideModal();
    });

    element.append(modal);
}