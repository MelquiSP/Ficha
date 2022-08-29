import {Formulario} from '../components/Formula'

export function Home() {
  return (
    <div className="bg-orange-300 w-[50%] grid grid-col-12 h-full p-2">
      <div id="" className='bg-orange-500 border-zinc-700 border-2 w-full h-2' ></div>
      <form action="" method='' name=''>
        <div id='Nome'>

        </div>
        <div id='ca-hp' className='flex flex-col'>
          <label htmlFor="">Classe de Armadura <input type="text" size={14}/></label>
          <label htmlFor="">Pontos de Vida <input type="text" size={14}/></label>
          <label htmlFor="">Deslocamento <input type="text" size={14}/></label>

        </div>
        <div id='habilidades'>

        </div>
        <div id='resistencias'>

        </div>


      </form>
           
    </div>
  )
}

export default Home
