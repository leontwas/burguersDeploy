const productsContainer = document.getElementById('products-container')



const template = (data) => `
  <div class="row g-0">
    <div class="col-7 col-sm-8">
      <div class="card-body">
        <h5 class="card-title">${data.nombre}</h5>
        <p class="card-text">$${data.precio.toFixed(2)}</p>
        <p class="card-text"><small class="text-muted">Código: ${data.id} - Stock: ${data.stock} unidades</small></p>
      </div>
    </div>
  </div>`



const showProducts = (products) => {
  for (let product of products) {
    const div = document.createElement('div')
    div.className = 'card my-2'
    div.innerHTML = template(product)
    productsContainer.append(div)
  }
}



fetch('https://burguersdeploy-production.up.railway.app/productos')
  .then(res => res.json())
  .then(res => showProducts(res))
  .catch(err => console.log(err))