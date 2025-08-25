import React, { useState } from "react";
import { addBook, fetchAllBooks } from "../store/slices/bookSlice";
import { useDispatch } from "react-redux";
import { toggleAddBookPopup } from "../store/slices/popUpSlice";
import { toast } from "react-toastify";

const AddBookPopup = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  const handleAddBook = (e) => {
    e.preventDefault();
    if (price < 1) return toast.error("Minimum price for a book is $1.");
    const data = new FormData();
    data.append("title", title);
    data.append("author", author);
    data.append("price", price);
    data.append("quantity", quantity);
    data.append("description", description);
    dispatch(addBook(data));
    dispatch(fetchAllBooks());
    dispatch(toggleAddBookPopup());
  };
  return (
    <>
    {/* COPY PASTE RECORD BOOK */}
      <div className="fixed inset-0 bg-[#689F38] bg-opacity-50 p-5 flex items-center justify-center z-50">
        <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Add New Book</h3>
            <form onSubmit={handleAddBook}>
              <div className="mb-4">
                <label className="block text-gray-900 font-medium">
                  Book Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Book's title"
                  className="w-full px-4 py-2 border border-[#689F38] rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 font-medium">
                  Book Author
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Book's Author"
                  className="w-full px-4 py-2 border border-[#689F38] rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 font-medium">
                  Book Price (Price for borrowing)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Book's price"
                  className="w-full px-4 py-2 border border-[#689F38] rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 font-medium">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Book's quantity"
                  className="w-full px-4 py-2 border border-[#689F38] rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 font-medium">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Book's description"
                  className="w-full px-4 py-2 border border-[#689F38] rounded-md"
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => dispatch(toggleAddBookPopup())}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#689F38] text-white rounded-md hover:bg-gray-800"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBookPopup;
