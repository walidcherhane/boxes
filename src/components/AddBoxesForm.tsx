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
        className="bg-gray-50 border-2 flex flex-col p-8 fixed top-4 right-4"
      >
        <label htmlFor="boxes" className="text-sm mb-1">
          Enter Boxes Number
        </label>
        <input
          type="number"
          name="p"
          min={0}
          defaultValue={2}
          className="px-5 py-2 border outline-none"
        />
        <label htmlFor="childrens" className="text-sm mb-1 mt-8">
          Enter Childrens Number
        </label>
        <input
          type="number"
          name="n"
          min={0}
          defaultValue={3}
          className="px-5 py-2 border outline-none"
        />
        <input type="submit" className="bg-gray-800 text-white py-2 mt-4" />
      </form>
    </>
  );
}

export default AddBoxesForm;
