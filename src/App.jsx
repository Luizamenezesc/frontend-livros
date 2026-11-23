import { useState } from 'react'
import './App.css'

function App() {
  const [livros, setLivros] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

async function buscarLivros() {
   

    setCarregando(true)
    setErro('')
    setLivros([])

    try {
      const resposta = await fetch('/api/livros')

      if (!resposta.ok) {
        throw new Error('Erro ao buscar livros')
      }

      const dados = await resposta.json()
      setLivros(dados.livros)
    } catch (erro) {
      setErro('Não foi possível buscar os livros. Verifique se a API está funcionando.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div>
      <h1>Catálogo de Livros</h1>

      <button onClick={buscarLivros}>
        Buscar Livros
      </button>

      {carregando && <p>Carregando livros...</p>}

      {erro && <p>{erro}</p>}

      <div>
        {livros.map((livro) => (
          <div key={livro.id}>
            <p>ID: {livro.id}</p>
            <p>Título: {livro.titulo}</p>
            <p>Autor: {livro.autor}</p>
            <p>Ano: {livro.ano}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App