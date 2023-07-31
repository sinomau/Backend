document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("changeRole").addEventListener("click", async () => {
    const id = document.getElementById("userId").value;
    if (id === "") {
      alert("Debe ingresar un id");
      return;
    }
    const put = await fetch(`/api/users/premium/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("deleteUser").addEventListener("click", async () => {
    const del = await fetch(`/api/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("Usuarios eliminados correctamente.");
    const data = await del.json();
  });
});
