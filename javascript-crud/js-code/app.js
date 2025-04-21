import {
  addCustomers,
  addStocks,
  deleteCustomer,
  deleteStocks,
  editCustomer,
  getCustomers,
  getStocks,
  updateStock,
} from './api.js';
import { renderCustomers, renderStocks, renderLoader } from './ui.js';

const pageBtns = document.querySelector('.pages');
/* ----------------------STOCKS----------------------------------- */
const modal = document.querySelector('.modal-container');
const addBtn = document.querySelector('.addBtn');
const closeBtn = document.querySelector('.cancel');
const form = document.querySelector('#fromId');
const stocksContent = document.querySelector('.stocks');
const customersContent = document.querySelector('.customers');
const tableBody = document.querySelector('#stocksTable');

/* ----------------------- CUSTOMER  ------------------------------------- */
const modalCust = document.querySelector(
  '.modal-container-customers'
);
const addCustBtn = document.querySelector('.addCstmrsBtn');
const closeCustBtn = document.querySelector('.cancelCust');
const tableCustBody = document.querySelector('#customersTable');
const customerForm = document.querySelector('#customer-modal form');

// Global state
let state = {};

/* ----------------------------- Page ----------------------------------- */

const handlePage = (activeTab) => {
  if (activeTab === 'customers') {
    customersContent.classList.add('active');
    stocksContent.classList.remove('active');
    renderLoader(document.querySelector('.stocks table tbody'));
    getCustomers().then((res) => {
      state.customers = res.data.Content;
      renderCustomers(res.data.Content);
    });
  } else {
    customersContent.classList.remove('active');
    stocksContent.classList.add('active');
    renderLoader(document.querySelector('.customers table tbody'));
    getStocks().then((res) => {
      state.stocks = res.data.Content;
      renderStocks(res.data.Content);
    });
  }

  pageBtns.id = activeTab;
};

document.addEventListener('DOMContentLoaded', () => {
  handlePage(localStorage.getItem('stocks'));
});

pageBtns.addEventListener('click', (e) => {
  handlePage(e.target.id);
  localStorage.setItem('activeTab', e.target.id);
});

/* ------------------------------ Stocks ------------------------------------------------------ */

export const closeStockModal = () => {
  form.reset();
  modal.classList.remove('active');
  modal.removeAttribute('data-mode');
  modal.removeAttribute('data-editId');
};

addBtn.addEventListener('click', () => {
  modal.classList.add('active');
});

closeBtn.addEventListener('click', closeStockModal);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // FormData nesnesini oluştur
  const formData = new FormData(e.target);

  // FormData içindeki değerleri alarak nesne oluştur
  const formDataObject = Object.fromEntries(formData.entries());
  formDataObject.IsActive = e.target.elements.IsActive.checked;

  if (modal.dataset.mode === 'edit') {
    const editItem = { ID: modal.dataset.editId, ...formDataObject };
    updateStock(editItem);
  } else {
    addStocks(formDataObject);
  }
});

tableBody.addEventListener('click', (e) => {
  if (e.target.id === 'editBtn') {
    // Düzenlenecek satırın bulunduğu tr elementini seç
    const row = e.target.closest('tr');
    const editId = row.dataset.id;

    // modal ayarları
    modal.dataset.mode = 'edit';
    modal.dataset.editId = editId;

    const found = state.stocks.find((stock) => stock.ID == editId);

    Object.entries(found).map(([key, value]) => {
      if (form[key]) {
        form[key].value = value;
      }

      if (typeof value === 'boolean') {
        form[key].checked = value;
      }
    });

    // Modal'ı aç
    modal.classList.add('active');
  } else if (e.target.id === 'deleteBtn') {
    const row = e.target.closest('tr');
    const dataId = row.dataset.id;
    deleteStocks(dataId, row);
  }
});

/* ------------------------------ Customers ------------------------------------------------------ */
export const closeCustomerModal = () => {
  modalCust.classList.remove('active');
  customerForm.reset();
  modalCust.removeAttribute('data-mode');
  modalCust.removeAttribute('data-edit-id');
};

addCustBtn.addEventListener('click', () => {
  modalCust.classList.add('active');
});

closeCustBtn.addEventListener('click', closeCustomerModal);

customerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const formDataObject = Object.fromEntries(formData.entries());

  if (modalCust.dataset.mode === 'edit') {
    const editItem = {
      ID: modalCust.dataset.editId,
      ...formDataObject,
    };

    editCustomer(editItem);
  } else {
    addCustomers(formDataObject);
  }
});

tableCustBody.addEventListener('click', (e) => {
  if (e.target.id === 'editBtn') {
    const editId = e.target.dataset.id;
    modalCust.dataset.mode = 'edit';
    modalCust.dataset.editId = editId;

    // düzenlenicek elemanı bulma
    const found = state.customers.find((item) => item.ID == editId);

    Object.entries(found).map(([key, value]) => {
      if (customerForm[key]) {
        customerForm[key].value = value;
      }
    });

    // Modal'ı aç
    modalCust.classList.add('active');
  } else if (e.target.id === 'deleteBtn') {
    const dataId = e.target.getAttribute('data-id');

    const row = e.target.closest('tr');

    deleteCustomer(dataId, row);
  }
});
