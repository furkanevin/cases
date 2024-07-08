const passiveIcon = '<i class="fa-regular fa-circle-xmark"></i>';
const activeIcon =
  '<span class="material-symbols-outlined"> task_alt </span>';

// notification
export const notify = (text, status = true) => {
  Toastify({
    text: text,
    style: {
      background: status
        ? 'linear-gradient(to right, #00b09b, #96c93d)'
        : 'crimson',
      borderRadius: '10px',
    },
  }).showToast();
};

// Stock UI Functions
export const renderStocks = (data) => {
  const tbody = document.querySelector('.stocks table tbody');
  tbody.innerHTML = data
    .map(
      (stock) => `<tr data-id="${stock.ID}" >
              <td><span>${stock.Name}</span></td>
              <td><span>${stock.SellerCode}</span></td>
              <td><span>${stock.UnitName}</span></td>
              <td><span>${stock.Price}</span></td>
              <td><span>${stock.TaxPercent}</span></td>
              <td>${stock.IsActive ? activeIcon : passiveIcon}</td>
              <td>
                <div class="btn">
                <button id="deleteBtn">SİL</button>
                <button id="editBtn">DÜZENLE</button>
                </div>
              </td>
            </tr>
      `
    )
    .join(' ');
};

export const removeStockRow = (row) => {
  const tbody = document.querySelector('.stocks table tbody');
  tbody.removeChild(row);
};

export const renderNewStocks = (data) => {
  const tbody = document.querySelector('.stocks table tbody');
  tbody.insertAdjacentHTML(
    'afterbegin',
    `<tr>
  <td><span>${data.Name}</span></td>
  <td><span>${data.SellerCode}</span></td>
  <td><span>${data.UnitName}</span></td>
  <td><span>${data.Price} ₺</span></td>
  <td><span>${data.TaxPercent}</span></td>
  <td>${data.IsActive ? activeIcon : passiveIcon}</td>
  <td>
  <div class="btn">
    SIRAYA ALINDI
  </div>
</td>
</tr>
`
  );
};

export const renderEditStocks = (data) => {
  const existingRow = document.querySelector(
    `tr[data-id="${data.ID}"]`
  );

  if (existingRow) {
    // Satır zaten varsa güncelle
    existingRow.innerHTML = `
      <td><span>${data.Name}</span></td>
      <td><span>${data.SellerCode}</span></td>
      <td><span>${data.UnitName}</span></td>
      <td><span>${data.Price}</span></td>
      <td><span>${data.TaxPercent}</span></td>
      <td>${data.IsActive ? activeIcon : passiveIcon}</td>
      <td>
       <div class="btn">
       <button id="deleteBtn">SİL</button>
       <button id="editBtn">DÜZENLE</button>
     </div>
     </td>
    `;
  }
};

// Customer UI Functions
export const renderCustomers = (data) => {
  const tbody = document.querySelector('.customers table tbody');
  tbody.innerHTML = data
    .map(
      (customer) => `
       <tr data-id="${customer.ID}">
        <td><span id="Name" >${customer.Name}</span></td>
        <td><span id="TaxNumber">${customer.TaxNumber}</span></td>
        <td><span id="TaxDepartment">${
          customer.TaxDepartment
        }</span></td>
        <td><span id="Email">${
          customer.Email ? customer.Email : 'İçerik Bulunamadı'
        }</span></td>
        <td>
          <div class="location">
            <div>
              <i class="fa-solid fa-city"></i>
              <span id="City">${customer.City}</span>
            </div>
            <div>
              <i class="fa-solid fa-map-location-dot"></i>
              <span id="Country">${customer.Country}</span>
            </div>
          </div>
        </td>
        <td>
          <div class="btn">
            <button id="deleteBtn" data-id="${
              customer.ID
            }">SİL</button>
            <button id="editBtn" data-id="${
              customer.ID
            }">DÜZENLE</button>
          </div>
        </td>
      </tr>`
    )
    .join('');
};

export const removeCustomerRow = (row) => {
  const tbody = document.querySelector('.customers table tbody');
  tbody.removeChild(row);
};

export const renderNewCustomers = (data) => {
  const tbody = document.querySelector('.customers table tbody');
  tbody.insertAdjacentHTML(
    'afterbegin',
    `<tr>
         <td><span>${data.Name}</span></td>
         <td><span>${data.TaxNumber}</span></td>
         <td><span>${data.TaxDepartment}</span></td>
         <td><span>${customer.Email}</span></td>
         <td>
           <div class="location">
             <div>
               <i class="fa-solid fa-city"></i>
               <p>${customer.City}</p>
             </div>
             <div>
               <i class="fa-solid fa-map-location-dot"></i>
               <p>${customer.Country}</p>
             </div>
           </div>
         </td>
         <td>
           <div class="btn">SIRAYA ALINDI</div>
         </td>
      </tr>

`
  );
};

export const renderEditCustomers = (data) => {
  const existingRow = document.querySelector(
    `tr[data-id="${data.ID}"]`
  );

  if (existingRow) {
    existingRow.innerHTML = `
         <td><span>${data.Name}</span></td>
         <td><span>${data.TaxNumber}</span></td>
         <td><span>${data.TaxDepartment}</span></td>
         <td><span>${data.Email}</span></td>
         <td>
           <div class="location">
             <div>
               <i class="fa-solid fa-city"></i>
               <p>${data.City}</p>
             </div>
             <div>
               <i class="fa-solid fa-map-location-dot"></i>
               <p>${data.Country}</p>
             </div>
           </div>
         </td>
         <td>
          <div class="btn">
            <button id="deleteBtn" data-id="${data.ID}">SİL</button>
            <button id="editBtn" data-id="${data.ID}">DÜZENLE</button>
          </div>
         </td>
    `;
  }
};

export const renderLoader = (outlet) => {
  outlet.innerHTML = `
  <section class="dots-container active">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</section>
 `;
};
