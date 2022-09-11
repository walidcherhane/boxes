import { useBoxContext } from "../BoxesContext";

export default function Box({ box }: { box: Box }) {
  const { addBox, deleteBox, childrens, setChildrens } = useBoxContext();
  const handleBoxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChildrens = childrens.map((child) => {
      if (child.id === box.id) {
        return { ...child, value: e.target.value };
      }
      return child;
    });
    setChildrens(newChildrens);
  };

  const childs = childrens.filter((child) => child.parentId === box.id);

  return (
    <>
      <div
        className="grow m-2 border-2  border-black"
        style={{
          backgroundColor: box.color,
        }}
      >
        <div className="flex gap-2  items-center justify-between ">
          <div
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("boxId", box.id.toString());
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              const boxId = Number(e.dataTransfer.getData("boxId"));
              const newChildrens = childrens.map((child) => {
                if (child.id === boxId && child.id !== box.id) {
                  return { ...child, parentId: box.id };
                }
                // parent is dragged over the child
                else if (child.id === box.id && child.parentId === boxId) {
                  return { ...child, parentId: undefined };
                }
                return child;
              });
              setChildrens(newChildrens);
            }}
            className="cursor-grab p-3"
          >
            <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.5 4.625a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zm4 0a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM10.625 7.5a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zM5.5 8.625a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zm5.125 2.875a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zM5.5 12.625a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex w-full flex-col md:flex-row  items-stretch justify-between gap-2 p-2 ">
            <input
              type="text"
              className="border outline-none pl-4 w-full lg:w-auto"
              defaultValue={box.value}
              onChange={handleBoxValueChange}
            />
            <div className="flex w-full lg:w-auto gap-2 justify-end">
              <button
                onClick={() => {
                  addBox(box.id);
                }}
                className="px-3 py-1 bg-white w-full md:w-auto"
              >
                Add Child
              </button>
              <button
                onClick={() => deleteBox(box.id)}
                className="px-3 py-1 bg-white w-full md:w-auto"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        {childs.length ? (
          <div className="border-t-2 border-black">
            {childs.map((box) => (
              <Box key={box.id} box={box} />
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
