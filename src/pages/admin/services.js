import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Modal from '../../components/Modal';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [service, setService] = useState({
    division: '',
    title: '',
    description: '',
    mainImageUrl: '',
    subImageUrls: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await fetch('/api/services');
    const data = await res.json();
    setServices(data);
  };

  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
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

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });
    if (res.ok) {
      alert('Service added successfully!');
      setService({ division: '', title: '', description: '', mainImageUrl: '', subImageUrls: [] });
      fetchServices();
    }
  };

  const deleteService = async (id) => {
    const res = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Service deleted successfully!');
      fetchServices();
    }
  };

  const openModal = (service, editing = false) => {
    setSelectedService(service);
    setIsEditing(editing);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/services?id=${selectedService._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedService),
    });
    if (res.ok) {
      alert('Service updated successfully!');
      closeModal();
      fetchServices();
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Manage Services</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add New Service</h2>
            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <input type="text" name="division" placeholder="Division" value={service.division} onChange={handleServiceChange} className="w-full p-3 border rounded-lg" />
              <input type="text" name="title" placeholder="Title" value={service.title} onChange={handleServiceChange} className="w-full p-3 border rounded-lg" />
              <textarea name="description" placeholder="Description" value={service.description} onChange={handleServiceChange} className="w-full p-3 border rounded-lg" />
              <div>
                <label className="block text-sm font-medium text-gray-700">Main Image</label>
                <input type="file" name="mainImage" onChange={async (e) => {
                  const urls = await handleImageUpload(e);
                  setService((prev) => ({ ...prev, mainImageUrl: urls[0] }));
                }} className="w-full p-3 border rounded-lg" />
                {service.mainImageUrl && <img src={service.mainImageUrl} alt="Main Preview" className="w-32 h-32 object-cover mt-4 rounded-lg" />}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sub Images</label>
                <input type="file" name="subImages" multiple onChange={async (e) => {
                  const urls = await handleImageUpload(e);
                  setService((prev) => ({ ...prev, subImageUrls: urls }));
                }} className="w-full p-3 border rounded-lg" />
                <div className="flex space-x-4 mt-4">
                  {service.subImageUrls.map((url, i) => <img key={i} src={url} alt={`Sub Preview ${i}`} className="w-24 h-24 object-cover rounded-lg" />)}
                </div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">Add Service</button>
            </form>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Existing Services</h2>
            <div className="space-y-4">
              {services.map((s) => (
                <div key={s._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <span className="font-medium">{s.title}</span>
                  <div className="space-x-2">
                    <button onClick={() => openModal(s)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">View</button>
                    <button onClick={() => openModal(s, true)} className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors">Edit</button>
                    <button onClick={() => deleteService(s._id)} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedService && (
          <div>
            {isEditing ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <input type="text" name="division" placeholder="Division" value={selectedService.division} onChange={(e) => setSelectedService({ ...selectedService, division: e.target.value })} className="w-full p-3 border rounded-lg" />
                <input type="text" name="title" placeholder="Title" value={selectedService.title} onChange={(e) => setSelectedService({ ...selectedService, title: e.target.value })} className="w-full p-3 border rounded-lg" />
                <textarea name="description" placeholder="Description" value={selectedService.description} onChange={(e) => setSelectedService({ ...selectedService, description: e.target.value })} className="w-full p-3 border rounded-lg" />
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">Update Service</button>
              </form>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">{selectedService.title}</h2>
                <p><strong>Division:</strong> {selectedService.division}</p>
                <p><strong>Description:</strong> {selectedService.description}</p>
                <img src={selectedService.mainImageUrl} alt="Main" className="w-full h-auto mt-4" />
                <div className="flex space-x-4 mt-4">
                  {selectedService.subImageUrls && selectedService.subImageUrls.map((url, i) => <img key={i} src={url} alt={`Sub ${i}`} className="w-24 h-24 object-cover" />)}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}
