import userStore from '../../store/user-store';
import { showModal } from '../render-modal/render-modal';
import './render-table.css';
import deleteUser from '../../usecases/delete-user';
let table;

const createTable = () =>{
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML=`
    <tr>
        <th>#ID</th>
        <th>Balance</th>
        <th>FirstName</th>
        <th>LastName</th>
        <th>Active</th>
        <th>Actions</th>
    </tr>`;
const tableBody = document.createElement('tbody');
table.append(tableHeaders, tableBody);
return table;

}

const tableSelectListener = ( event ) => {
    const element = event.target.closest('.select-user');
    console.log(event.target);
    if( !element ) return;

    const id = element.getAttribute('data-id');
    showModal( id );
}


const tableDeletetListener = async( event ) => {
    const element = event.target.closest('.delete-user');
    console.log(event.target);
    if( !element ) return;

    const id = element.getAttribute('data-id');
    try {
        await deleteUser( id );
        await userStore.reloadPage();
        document.querySelector('#current-page').innerText = userStore.getCurrentPage();
        renderTable();
    
    } catch (error) {
        alert('No se pudo eliminar el usuario');
    }
}

/**
 * @param {HTMLDivElement}
 */
export const renderTable = ( element ) =>{
    const users = userStore.getUsers();

    if( !table ){
        table = createTable();
        element.append(table);

        //todo listeners a  tabla
        table.addEventListener('click', tableSelectListener);
        table.addEventListener('click', tableDeletetListener);
    }

    let tableHTML = '';
    users.forEach( user => {
        tableHTML +=`
        <tr>
            <td>${user.id}</th>
            <td>${user.balance}</th>
            <td>${user.firstName}</th>
            <td>${user.lastName}</th>
            <td>${user.isActive}</th>
            <td>
                <a href="#/" class="select-user" data-id="${ user.id }">Select</a>
                |
                <a href="#/" class="delete-user" data-id="${ user.id }">Delete</a>
            </th>
        </tr>
        `

    });
    table.querySelector('tbody').innerHTML = tableHTML;

}