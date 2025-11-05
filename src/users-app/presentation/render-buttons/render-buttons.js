import userStore from "../../store/user-store";
import { renderTable } from "../render-table/render-table";
import './render-buttons.css'
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = (element) =>
{
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next >';

    const previousButton = document.createElement('button')
    previousButton.innerText = "< Prev";

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerText = userStore.getCurrentPage();

    element.append(previousButton,currentPageLabel,nextButton);

    nextButton.addEventListener('click',async() =>{
        await userStore.loadNextPage();
        currentPageLabel.innerText = userStore.getCurrentPage();
        renderTable(element);
    });

    previousButton.addEventListener('click', async() =>{
        await userStore.loadPreviousPage();
        currentPageLabel.innerText = userStore.getCurrentPage();
        renderTable( element );

    });
}