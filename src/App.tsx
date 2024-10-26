import { AppProvider } from "./providers/app-provider"

const App = () => {
  return (
    <main className="flex flex-1">
         <AppProvider/>
    </main>
  )
}

export default App