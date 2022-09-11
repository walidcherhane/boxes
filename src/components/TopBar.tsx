import React from "react";
import { useBoxContext } from "../BoxesContext";

function TopBar() {
  const { addBox, createNOfBoxes, reset, deleteBox } = useBoxContext();

  const handleChildrenPush = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const parentId = Number(formData.get("boxId"));
    const childrens = Number(formData.get("childrens"));
    const { submitter } = e.nativeEvent as any;
    if (submitter.getAttribute("data-action") === "delete") {
      deleteBox(parentId);
    } else {
      createNOfBoxes(0, childrens, parentId);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between w-full ">
        <form onSubmit={handleChildrenPush} className="flex gap-2 w-full md:flex-1 md:items-center flex-col md:flex-row ">
          <input
            required
            name="boxId"
            placeholder="Type the box id"
            type="text"
            className="w-full lg:w-auto px-5 py-2 border border-gray-900 placeholder:text-gray-800 rounded-md outline-none mr-2 bg-transparent text-black"
          />
          <input
            required
            defaultValue={3}
            name="childrens"
            placeholder="Number of childrens"
            type="number"
            className="w-full lg:w-auto px-5 py-2  border border-gray-900 placeholder:text-gray-800 rounded-md outline-none mr-2 bg-transparent text-black"
          />
          <div className="flex w-full md:items-center">
            <button
              type="submit"
              data-action="add"
              className="px-4 p-2 bg-gray-900 text-white rounded-md w-full  md:w-auto"
            >
              Add Childrens
            </button>
            <button
              type="submit"
              data-action="delete"
              className="ml-2 px-4 p-2 bg-gray-900 text-white rounded-md w-full md:w-auto"
            >
              Delete
            </button>
          </div>
        </form>
        <div className=" flex w-full  md:w-auto">
          <button
            onClick={() => addBox()}
            className=" px-4 p-2 bg-gray-900 text-white rounded-md   w-full md:w-auto"
          >
            Add Box
          </button>
          <button
            onClick={() => reset()}
            className="ml-2 px-4 p-2 bg-gray-900 text-white rounded-md  w-full md:w-auto"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default TopBar;
