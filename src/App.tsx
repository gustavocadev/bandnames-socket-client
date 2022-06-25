import { SocketProvider } from './context/socket';
import Home from './routes/Home';
function App() {
  return (
    <SocketProvider>
      <main className="container mx-auto">
        <Home />
      </main>
    </SocketProvider>
  );
}

export default App;
