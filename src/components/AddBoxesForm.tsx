import React from "react";
import { useBoxContext } from "../BoxesContext";

function AddBoxesForm() {
  const { createNOfBoxes } = useBoxContext();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const p = Number(formData.get("p"));
    const n = Number(formData.get("n"));
    createNOfBoxes(p, n);
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="bg-indigo-50/30 border border-gray-400 flex flex-col rounded-md p-8 "
      >
        <label htmlFor="boxes" className="text-sm mb-4">
          Enter Boxes Number
        </label>
        <input
          type="number"
          name="p"
          min={0}
          defaultValue={2}
          className="w-full px-5 py-2 border border-gray-900 placeholder:text-gray-800 rounded-md outline-none mr-2 bg-transparent text-black" 
          />
        <label htmlFor="childrens" className="text-sm mb-4 mt-8">
          Enter Childrens Number
        </label>
        <input
          type="number"
          name="n"
          min={0}
          defaultValue={3}
          className="w-full px-5 py-2 border border-gray-900 placeholder:text-gray-800 rounded-md outline-none mr-2 bg-transparent text-black" 
          />
        <input type="submit" className="bg-gray-800 text-white py-2 mt-4 rounded-md" />
      </form>
    </>
  );
}

export default AddBoxesForm;
