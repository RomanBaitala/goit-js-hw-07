import { galleryItems } from './gallery-items.js';
const IMG_NODE = "IMG";
const ESC_KEY = "Escape";
const galleryRef = document.querySelector('.gallery');
const cardCreateEvt = cardCreate(galleryItems);
galleryRef.insertAdjacentHTML('beforeend', cardCreateEvt);
galleryRef.addEventListener('click', ModalOpen);

function ModalOpen(evt) {
    evt.preventDefault();
    const { nodeName, dataset } = evt.target;
    nodeName === IMG_NODE && showModal(dataset.source);
}

function showModal(src) {
    const handleModalClose = ({ code }) => {
        code === ESC_KEY && modal.close();
    };
    const modalMarkup = `<img src="${src}">`;
    const modalOptions = {
        onShow: () => {
            document.addEventListener("keydown", handleModalClose);
        },
        onClose: () => {
            document.removeEventListener("keydown", handleModalClose);
        },
    };
    const modal = basicLightbox.create(modalMarkup, modalOptions)
    modal.show();
}
function cardCreate(galleryItems){
    return galleryItems
    .map(({preview, original, description}) => {
        return `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
            </a>
        </div>`
    }).join('');
}