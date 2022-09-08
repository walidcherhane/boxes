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

  return (
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
          if (child.id === boxId) {
            return { ...child, parentId: box.id };
          } else if (child.id === box.id) {
            return { ...child, parentId: undefined };
          }
          return child;
        });
        setChildrens(newChildrens);
      }}
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "10px",
        backgroundColor: box.color,
        cursor: "grab",
      }}
    >
      <div className="flex items-center justify-between">
        <span>
          <input
            type="text"
            className="px-5 py-2 border outline-none mr-1"
            defaultValue={box.value}
            onChange={handleBoxValueChange}
          />
          BoxId: {box.id}
        </span>
        <button
          onClick={() => {
            addBox(box.id);
          }}
          className="px-3 py-2 bg-white rounded-md"
        >
          Add Child
        </button>
        <button
          onClick={() => deleteBox(box.id)}
          className="px-3 py-2 bg-white rounded-md"
        >
          Delete
        </button>
      </div>
      {childrens
        ?.filter((c) => c.parentId === box.id)
        ?.map((box) => (
          <Box key={box.id} box={box} />
        ))}
    </div>
  );
}
