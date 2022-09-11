import { createContext, useContext, useEffect, useState } from "react";

type BoxContextValues = {
  addBox: (parentId?: number) => void;
  deleteBox: (boxId: number) => void;
  childrens: Box[];
  reset: () => void;
  createNOfBoxes: (p: number, n?: number, parentId?: number) => void;
  setChildrens: React.Dispatch<React.SetStateAction<Box[]>>;
};

const BoxContext = createContext<BoxContextValues>({} as BoxContextValues);

export function useBoxContext() {
  return useContext(BoxContext);
}

export const BoxesProvider = ({ children }: { children: React.ReactNode }) => {
  const [childrens, setChildrens] = useState<Box[]>(
    JSON.parse(localStorage.getItem("boxes") || "[]")
  );

  // persist the state in local storage
  useEffect(() => {
    const data = localStorage.getItem("boxes");
    if (data?.length) {
      setChildrens(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    // the following code will make sure that any box that has parentId
    // but the parent is not in the state will be removed
    childrens.forEach((child) => {
      if (child.parentId) {
        const isParentExist = childrens.find((c) => c.id === child.parentId);
        if (!isParentExist) {
          deleteBox(child.id);
        }
      }
    });
    // update the local storage when the state changes
    localStorage.setItem("boxes", JSON.stringify(childrens));
  }, [childrens]);

  function randomColor() {
    // https://stackoverflow.com/a/1484514/104380
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  const addBox = (parentId?: number) => {
    const id = Math.floor(Math.random() * 100000);
    const newBox = {
      id,
      parentId,
      value: `Box Id ${id}`,
      color: randomColor(),
    };
    setChildrens((prev) => [...prev, newBox]);
    return newBox;
  };

  const createNOfBoxes = (p: number, n?: number, parentId?: number) => {
    // -------------------------------------------
    // p: number of parent boxes                 |
    // n: number of children boxes - optional    |
    // parentId: parent id - optional            |
    // -------------------------------------------

    // if we don't pass p, we create n boxes inside the box with id = parentId
    if (!p && parentId && n) {
      let id = parentId;
      for (let i = 0; i < n; i++) {
        const child = addBox(id);
        id = child.id;
      }
      return;
    }
    // we have p, means create p boxes with n childrens each
    for (let i = 0; i < p; i++) {
      // id here can be undefined if we don't pass parentId
      // if so, the box will be created in the root
      // we use its id to create the childrens
      let id = parentId;
      const parent = addBox(parentId);
      id = parent.id;
      if (!n) return;
      for (let j = 0; j < n; j++) {
        const newChild = addBox(id);
        // swap the id with the new child id
        id = newChild.id;
      }
    }
  };
  const deleteBox = (boxId: number) => {
    const newChildrens = childrens.filter((box) => box.id !== boxId);
    setChildrens(newChildrens);
  };
  const reset = () => {
    setChildrens([]);
  };

  return (
    <BoxContext.Provider
      value={{
        addBox,
        deleteBox,
        childrens,
        reset,
        createNOfBoxes,
        setChildrens,
      }}
    >
      {children}
    </BoxContext.Provider>
  );
};
