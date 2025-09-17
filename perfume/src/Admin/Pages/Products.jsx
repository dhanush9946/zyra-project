import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Productss = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    image: "",
    status: "active",
  });

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://database-1-p36v.onrender.com/perfumes");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // search filter
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  // delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://database-1-p36v.onrender.com/perfumes/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      toast.success('product deleted successfully')
    }
    
     catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // toggle status
  const toggleStatus = async (product) => {
    try {
      const updated = { ...product, status: product.status === "active" ? "inactive" : "active" };
      await axios.put(`https://database-1-p36v.onrender.com/perfumes/${product.id}`, updated);
      setProducts(products.map((p) => (p.id === product.id ? updated : p)));
      toast("Product status changed")
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // add product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.brand || !newProduct.category || !newProduct.price) {
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await axios.post("https://database-1-p36v.onrender.com/perfumes", {
        ...newProduct,
        id: Date.now().toString(),
        price: Number(newProduct.price),
      });
      setProducts([...products, res.data]);
      setNewProduct({ name: "", brand: "", category: "", price: "", image: "", status: "active" });
      toast.success("Product added successfully")
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // edit product
  const handleEditProduct = async () => {
    try {
      await axios.put(`https://database-1-p36v.onrender.com/perfumes/${editingProduct.id}`, editingProduct);
      setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)));
      setEditingProduct(null);
      toast.success("Edited")
    } catch (err) {
      console.error("Error editing product:", err);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

      {/* Search bar */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border px-4 py-2 rounded-lg w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Add Product Form */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">Add New Product</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border px-3 py-2 rounded-lg"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Brand"
            className="border px-3 py-2 rounded-lg"
            value={newProduct.brand}
            onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            className="border px-3 py-2 rounded-lg"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="border px-3 py-2 rounded-lg"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="border px-3 py-2 rounded-lg col-span-2"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
        </div>
        <button
          onClick={handleAddProduct}
          className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Add Product
        </button>
      </div>

      {/* Products Table */}
      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : (
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Brand</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.brand}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3 font-semibold text-indigo-600">₹{p.price}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleStatus(p)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        p.status === "active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {p.status}
                    </button>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => setEditingProduct(p)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <input
              type="text"
              className="border px-3 py-2 rounded-lg mb-2 w-full"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
            />
            <input
              type="text"
              className="border px-3 py-2 rounded-lg mb-2 w-full"
              value={editingProduct.brand}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, brand: e.target.value })
              }
            />
            <input
              type="text"
              className="border px-3 py-2 rounded-lg mb-2 w-full"
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, category: e.target.value })
              }
            />
            <input
              type="number"
              className="border px-3 py-2 rounded-lg mb-2 w-full"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
            />
            <input
              type="text"
              className="border px-3 py-2 rounded-lg mb-2 w-full"
              value={editingProduct.image}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, image: e.target.value })
              }
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleEditProduct}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productss;
