import './App.css';
import Pokemon from './Pokemon'
import pokemons from './data'
import Pokedex from './Pokedex'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Pokedex</h1>
      </header>
      <section className='pokeSec'>
        <Pokedex pokemons={pokemons}/>
      </section>
    </div>
  );
}

export default App;
