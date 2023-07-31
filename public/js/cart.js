document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll("#deleteProduct");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();

      const cartId = button.dataset.cartId;
      const productId = button.dataset.productId;

      try {
        const response = await fetch(
          `api/carts/${cartId}/products/${productId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          alert("Producto eliminado del carrito");
          button.closest("article").remove();
        } else {
          console.error("Error al eliminar el producto del carrito");
        }
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    });
  });
});
