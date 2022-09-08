import React from "react";
import { useBoxContext } from "../BoxesContext";

function TopBar() {
  const { addBox, createNOfBoxes, reset, deleteBox } = useBoxContext();

  const handleChildrenPush = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const parentId = Number(formData.get("boxId"));
    const { submitter } = e.nativeEvent as any;
    if (submitter.getAttribute("data-action") === "delete") {
      deleteBox(parentId);
    } else {
      createNOfBoxes(1, 2, parentId);
    }
  };

  return (
    <>
      <div className="flex gap-8 items-center justify-between w-full ">
        <form onSubmit={handleChildrenPush}>
          <input
            required
            name="boxId"
            placeholder="Type the box id"
            type="text"
            className="px-5 py-2 border outline-none mr-2"
          />
          <button
            type="submit"
            data-action="add"
            className="px-4 p-2 bg-gray-900 text-white rounded-md "
          >
            Add Childrens
          </button>
          <button
            type="submit"
            data-action="delete"
            className="ml-2 px-4 p-2 bg-gray-900 text-white rounded-md "
          >
            Delete
          </button>
        </form>
        <div className=" flex gap-4 items-center">
          <button
            onClick={() => addBox()}
            className=" px-4 p-2 bg-gray-900 text-white rounded-md "
          >
            Add Box
          </button>
          <button
            onClick={() => reset()}
            className=" px-4 p-2 bg-gray-900 text-white rounded-md "
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default TopBar;
