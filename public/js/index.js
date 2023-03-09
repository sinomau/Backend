const socket = io();

const containerProducts = document.getElementById("list");

socket.on("new-product", (data) => {
  console.log(data);
  containerProducts.innerHTML += `
    <ul>
    <li>Id: ${data.id}</li>
    <li>Producto: ${data.title}</li>
    <li>Descripcion: ${data.description}</li>
    <li>Precio: ${data.price}</li>
    <li>Codigo: ${data.code}</li>
    <li>Stock: ${data.stock}</li>
    </ul>

                                    `;
});

socket.on("delete-product", (products) => {
  containerProducts.innerHTML = "";
  products.forEach((items) => {
    containerProducts.innerHTML += `
      <ul>
      <li>Id: ${items.id}</li>
      <li>Producto: ${items.title}</li>
      <li>Descripcion: ${items.description}</li>
      <li>Precio: ${items.price}</li>
      <li>Codigo: ${items.code}</li>
      <li>Stock: ${items.stock}</li>
      </ul>   `;
  });
});

socket.on("update-product", (update) => {
  containerProducts.innerHTML = "";
  update.forEach((items) => {
    containerProducts.innerHTML += `
        <ul>
        <li>Id: ${items.id}</li>
        <li>Producto: ${items.title}</li>
        <li>Descripcion: ${items.description}</li>
        <li>Precio: ${items.price}</li>
        <li>Codigo: ${items.code}</li>
        <li>Stock: ${items.stock}</li>
        </ul>   `;
  });
});
