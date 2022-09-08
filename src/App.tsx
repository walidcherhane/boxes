import AddBoxesForm from "./components/AddBoxesForm";
import Box from "./components/Box";
import { useBoxContext } from "./BoxesContext";
import Features from "./components/Features";
import TopBar from "./components/TopBar";
interface Box {
  id: number;
  value: string;
  color: string;
  parentId?: number;
}

function App() {
  const { childrens } = useBoxContext();
  return (
    <main className="min-h-screen relative grid grid-cols-4 w-full bg-gray-50">
      <AddBoxesForm />
      <div className=" col-span-3  m-8 ">
        <Features />
        <div className="mt-20">
          <TopBar />
          {!childrens.length ? (
            <>
              <div className="text-gray-300 text-center mt-8">
                <h1 className="text-4xl font-bold">Welcome to Boxes</h1>
                <p className="text-lg mt-1">
                  Start adding boxes To see them here!
                </p>
              </div>
            </>
          ) : (
            childrens
              .filter((child) => !child.parentId)
              .map((box) => <Box key={box.id} box={box} />)
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
