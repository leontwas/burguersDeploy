document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.querySelector('form[action="./productos/"]');
    
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(addProductForm);
        const productData = {
            nombre: formData.get('nombre'),
            descripcion: formData.get('descripcion'),
            precio: formData.get('precio'),
            stock: formData.get('stock')
        };

        fetch('../Routes/productos.routes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Error al agregar el producto');
            }
            return res.json();
        })
        .then(res => {
            alert('Producto agregado con éxito');
          
            addProductForm.reset();
            
            loadProducts(); 
        })
        .catch(err => alert(err.message));
    });
});
