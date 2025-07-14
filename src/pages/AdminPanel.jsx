import React from "react";
import categoryData from "./category";

function AdminPanel() {
  const [adminForm, setAdminForm] = React.useState({
    category: "select one",
    images: [],
  });
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [isLoading, setIsLoading ] = React.useState(false); // Loader state

  const handleAdminInputChange = (e) => {
    setAdminForm({ ...adminForm, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setAdminForm({ ...adminForm, images: Array.from(e.target.files) });
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loader
    const formData = new FormData();
    formData.append("category", adminForm.category);
    adminForm.images.forEach((image) => formData.append("images", image));

    try {
      const response = await fetch(
        "https://backend-1-l4q3.onrender.com/api/images",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Images uploaded successfully!");
      setAdminForm({ category: "welcome_baby", images: [] });
      // ...refresh logic...
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images.");
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  return (
    <>
      <section id="admin" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Admin: Upload Images
            </h2>
            <p className="text-xl text-gray-600">
              Add new images to a category
            </p>
          </div>
          <form
            onSubmit={handleAdminSubmit}
            className="max-w-lg mx-auto space-y-6"
          >
            <div>
              <select
                name="category"
                value={adminForm.category}
                onChange={handleAdminInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {categoryData.map((cat) => (
                  <option key={cat.category} value={cat.category}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="file"
                name="images"
                onChange={handleFileChange}
                multiple
                accept="image/jpeg,image/png"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Upload Images"}
            </button>
            {isLoading && (
              <div className="flex justify-center mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-600"></div>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default AdminPanel;
