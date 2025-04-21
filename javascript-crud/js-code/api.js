import { closeCustomerModal, closeStockModal } from "./app.js";
import {
  removeStockRow,
  removeCustomerRow,
  renderNewStocks,
  renderNewCustomers,
  renderEditStocks,
  renderEditCustomers,
  notify,
} from "./ui.js";

const stockEndpoint = "/general/Stocks";
const customerEndpoint = "/general/Customers";

// axios settings
axios.defaults.baseURL = "https://apitest.nilvera.com";
axios.defaults.headers.common["Authorization"] =
  "Bearer 14E5721BC5C58B2DF465683B54F252C0EC67C61C1EC7A1308296604167457CD1";

const renderErrors = (error) => {
  error.response?.data?.Errors?.map((warn) => {
    Toastify({
      text: warn.Description + " " + warn.Detail,
      style: {
        background: "crimson",
        borderRadius: "10px",
      },
    }).showToast();
  });
};

/* Stocks API Request */
export const getStocks = async () => {
  try {
    return await axios.get(stockEndpoint);
  } catch (err) {
    console.log(err);
  }
};

export const deleteStocks = (id, row) => {
  axios
    .delete(`${stockEndpoint}/${id}`)
    .then(() => {
      removeStockRow(row);

      notify("Stock kaldırıldı", false);
    })
    .catch((err) => renderErrors(err));
};

export const updateStock = (editItem) => {
  axios
    .put(stockEndpoint, editItem)
    .then(() => {
      renderEditStocks(editItem);
      closeStockModal();
      notify("Stock güncellendi");
    })
    .catch((err) => renderErrors(err));
};

export const addStocks = (newStocks) => {
  axios
    .post(`${stockEndpoint}`, [newStocks])
    .then(() => {
      renderNewStocks(newStocks);
      closeStockModal();
      notify("Yeni Stock Sıraya Alındı");
    })
    .catch((err) => renderErrors(err));
};

/* Customers API Request */
export const getCustomers = async () => {
  try {
    return await axios.get(customerEndpoint);
  } catch (err) {
    renderErrors(err);
  }
};

export const deleteCustomer = (id, row) => {
  axios
    .delete(`${customerEndpoint}/${id}`)
    .then(() => {
      removeCustomerRow(row);
      notify("Müşteri silindi", false);
    })
    .catch((error) => renderErrors(error));
};

export const addCustomers = (newCustomers) => {
  axios
    .post(`${customerEndpoint}`, [newCustomers])
    .then(() => {
      renderNewCustomers(newCustomers);
      closeCustomerModal();
      notify("Müşteri sıraya alındı");
    })
    .catch((error) => renderErrors(error));
};

export const editCustomer = (editItem) => {
  axios
    .put(`${customerEndpoint}`, editItem)
    .then(() => {
      renderEditCustomers(editItem);
      closeCustomerModal();

      notify("Müşteri Güncellendi");
    })
    .catch((error) => renderErrors(error));
};
