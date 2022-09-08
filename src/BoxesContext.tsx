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

  // update the local storage when the state changes
  useEffect(() => {
    localStorage.setItem("boxes", JSON.stringify(childrens));
  }, [childrens]);

  function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  const addBox = (parentId?: number) => {
    const newBox = {
      id: Math.floor(Math.random() * 100000),
      value: "New Box",
      color: randomColor(),
      parentId,
    };
    setChildrens((prev) => [...prev, newBox]);
    return newBox;
  };

  const createNOfBoxes = (p: number, n?: number, parentId?: number) => {
    Array.from({ length: p }).forEach(() => {
      const parent = addBox(parentId);
      let id = parent.id;
      if (!n) return;
      for (let index = 0; index < n; index++) {
        const newChild = addBox(id);
        id = newChild.id;
      }
    });
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
