import style from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

export default function ProjectForm({btnText}){
    return(
        <form className={style.form}>
            <Input 
            type="text" 
            text="Nome do Projeto" 
            name="name" 
            placeholder="Insira o nome do projeto" />
            <Input 
            type="number" 
            text="Orçamento do Projeto" 
            name="orcamento" 
            placeholder="Insira o orçamento total" />

            <Select name="category_id" text="Selecione a Categoria" />
            
            <SubmitButton text={btnText} />
        </form>
    )
}