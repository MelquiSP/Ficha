import {Formulario} from '../components/Formula'
import { useEffect, createRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useScreenshot, createFileName } from 'use-react-screenshot'

interface classeProps {
  armadura: string;
  HP: string;
  speed: string;

}


export function Home() {

  const [armadura, setArmadura] = useState('0');
  const [speed, setSpeed] = useState('0');
  const [HP, setHP] = useState('0');
  const [classe, setClasse] = useState<classeProps>({} as classeProps);
  const notify = () => toast("Usuário salvo com sucesso!");

  const ref = createRef(null)

    const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });

  async function carregarDados(){
    const user = localStorage.getItem('classe') // pega dados do local storage da chave chamda classe

    //valida se existe um usuario, caso não existe o processo não continua
    if(!user){
      return null
    }
    
    //transforma os dados do tipo json para string para conseguirmos maniplar
    const userFormatado = JSON.parse(user);

    //coloca o valor da variavel userFormatado no state setClasse
    setClasse(userFormatado);
    
  }
//coloca os dados no useState pra carregar a tela e atualizar os valores
  async function ColocarDados(){

    setArmadura(classe!.armadura)
    setHP(classe!.HP)
    setSpeed(classe!.speed)

    
  }

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

     const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

async function salvarUsuario(){ //botão que é clicado para salvar o usuario no localstorage que é nosso banco de dados

    const salvarUsuario = {
      armadura,
      HP,
      speed
    }

    await localStorage.setItem("classe", JSON.stringify(salvarUsuario));
    notify();

    //salva imagem 

    downloadScreenshot();

 


  }

  
  useEffect(() => {
   //ao carregar a tela a primeira coisa que é feita é chamar a função carregarDados
    carregarDados();
    //dps de carregar os dados salvos eles são colocados nas variaveis
    
  }, [])

  //vc pode ter quantos useeffects precisar, esse daqui o que acontece, quando atualizar a classe ou seja tiver com os dados, ai ela coloca os dados da classe nas variaveis
  useEffect(()=>{
    ColocarDados();

  },[classe])





  return (
    <div  className="bg-orange-300 w-[50%] grid grid-col-12 h-full p-2">
      <div id="" className='bg-orange-500 border-zinc-700 border-2 w-full h-2' ></div>
      <form action="" method='' name=''>
        <div id='Nome'>

        </div>
       
        <div ref={ref} id='ca-hp' className='flex flex-col'>
          <label   htmlFor="">Classe de Armadura <input  value={armadura ?? ''} onChange={(e)=>setArmadura(e.target.value)}  className='bg-orange-300' type="text" size={14}/></label>
          <label htmlFor="">Pontos de Vida <input value={HP ?? ''}  onChange={(e)=>setHP(e.target.value)} className='bg-orange-300' type="text" size={14}/></label>
          <label htmlFor="">Deslocamento <input  value={speed ?? ''}   onChange={(e)=>setSpeed(e.target.value)} className='bg-orange-300' type="text" size={14}/></label>

        </div>
      <img  />

        <div id='habilidades'>

        </div>
        <div id='resistencias'>

        </div>

        
      </form>
        <ToastContainer />

      <button onClick={salvarUsuario}>Salvar</button>
           
    </div>

  )
}

export default Home
