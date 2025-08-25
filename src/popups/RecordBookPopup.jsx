import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleRecordBookPopup } from "../store/slices/popUpSlice";
import { recordBorrowBook } from "../store/slices/borrowSlice";

const RecordBookPopup = ({ bookId }) => {
  const [borrowerEmail, setBorrowerEmail] = useState("");

  const dispatch = useDispatch();

  const handleRecordBook = (e) => {
    e.preventDefault();
    dispatch(recordBorrowBook(bookId, borrowerEmail));
  };

  return (
    <>
      <div className="fixed inset-0 bg-[#689F38] bg-opacity-50 p-5 flex items-center justify-center z-50">
        <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Record Book</h3>
            <form onSubmit={handleRecordBook}>
              <div className="mb-4">
                <label className="block text-gray-900 font-medium">
                  User Email
                </label>
                <input
                  type="email"
                  required
                  value={borrowerEmail}
                  onChange={(e) => setBorrowerEmail(e.target.value)}
                  placeholder="Borrower's email"
                  className="w-full px-4 py-2 border border-[#689F38] rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => dispatch(toggleRecordBookPopup())}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#689F38] text-white rounded-md hover:bg-gray-800"
                >
                  Record
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordBookPopup;
