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
    <main className="min-h-screen bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100" >
      <div className="flex flex-col gap-y-4 md:flex-row justify-between p-8">
        <Features />
        <AddBoxesForm />
      </div>
      <div className="mt-4 mx-8">
        <TopBar />
        <div className="py-8 ">
          {!childrens?.length ? (
            <>
              <div className=" text-center">
                <h1 className="text-4xl font-bold text-indigo-400/40">
                  Welcome to Boxes
                </h1>
                <p className=" mt-1 text-indigo-400/40">
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
