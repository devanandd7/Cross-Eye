import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Modal from '../../components/Modal';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    category: '',
    title: '',
    description: '',
    price: '',
    mainImageUrl: '',
    subImageUrls: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data.urls;
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (res.ok) {
      alert('Product added successfully!');
      setProduct({ category: '', title: '', description: '', price: '', mainImageUrl: '', subImageUrls: [] });
      fetchProducts();
    }
  };

  const deleteProduct = async (id) => {
    const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Product deleted successfully!');
      fetchProducts();
    }
  };

  const openModal = (product, editing = false) => {
    setSelectedProduct(product);
    setIsEditing(editing);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/products?id=${selectedProduct._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedProduct),
    });
    if (res.ok) {
      alert('Product updated successfully!');
      closeModal();
      fetchProducts();
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Manage Products</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleProductChange} className="w-full p-3 border rounded-lg" />
              <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleProductChange} className="w-full p-3 border rounded-lg" />
              <textarea name="description" placeholder="Description" value={product.description} onChange={handleProductChange} className="w-full p-3 border rounded-lg" />
              <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleProductChange} className="w-full p-3 border rounded-lg" />
              <div>
                <label className="block text-sm font-medium text-gray-700">Main Image</label>
                <input type="file" name="mainImage" onChange={async (e) => {
                  const urls = await handleImageUpload(e);
                  setProduct((prev) => ({ ...prev, mainImageUrl: urls[0] }));
                }} className="w-full p-3 border rounded-lg" />
                {product.mainImageUrl && <img src={product.mainImageUrl} alt="Main Preview" className="w-32 h-32 object-cover mt-4 rounded-lg" />}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sub Images</label>
                <input type="file" name="subImages" multiple onChange={async (e) => {
                  const urls = await handleImageUpload(e);
                  setProduct((prev) => ({ ...prev, subImageUrls: urls }));
                }} className="w-full p-3 border rounded-lg" />
                <div className="flex space-x-4 mt-4">
                  {product.subImageUrls.map((url, i) => <img key={i} src={url} alt={`Sub Preview ${i}`} className="w-24 h-24 object-cover rounded-lg" />)}
                </div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">Add Product</button>
            </form>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Existing Products</h2>
            <div className="space-y-4">
              {products.map((p) => (
                <div key={p._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <span className="font-medium">{p.title}</span>
                  <div className="space-x-2">
                    <button onClick={() => openModal(p)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">View</button>
                    <button onClick={() => openModal(p, true)} className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors">Edit</button>
                    <button onClick={() => deleteProduct(p._id)} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedProduct && (
          <div>
            {isEditing ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <input type="text" name="category" placeholder="Category" value={selectedProduct.category} onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })} className="w-full p-3 border rounded-lg" />
                <input type="text" name="title" placeholder="Title" value={selectedProduct.title} onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })} className="w-full p-3 border rounded-lg" />
                <textarea name="description" placeholder="Description" value={selectedProduct.description} onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })} className="w-full p-3 border rounded-lg" />
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">Update Product</button>
              </form>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">{selectedProduct.title}</h2>
                <p><strong>Category:</strong> {selectedProduct.category}</p>
                <p><strong>Description:</strong> {selectedProduct.description}</p>
                <img src={selectedProduct.mainImageUrl} alt="Main" className="w-full h-auto mt-4" />
                <div className="flex space-x-4 mt-4">
                  {selectedProduct.subImageUrls && selectedProduct.subImageUrls.map((url, i) => <img key={i} src={url} alt={`Sub ${i}`} className="w-24 h-24 object-cover" />)}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}
