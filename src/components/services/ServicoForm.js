import { useState } from "react";
import style from '../project/ProjectForm.module.css'
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";

export default function ServicoForm({mudancaSubmit, textBtn, projectData}){

    const [service, setService] = useState({})

    function submit(event){
        event.preventDefault()
        projectData.services.push(service)
        mudancaSubmit(projectData)
    }
    function handleChange(event){
        setService({...service, [event.target.name] : event.target.value})  // Vai achar pelo nome do input que vai ser a chave da propriedade do obj ou seja pegando tudo vindo do obj e inserindo o valor para a propriedade que pega tudo do evento
    }

    return(
        <form onSubmit={submit} className={style.form}>
            <Input
            type="text"
            text="Nome do Serviço"
            name="name"
            placeholder="Insira o Nome do Serviço"
            handleOnChange={handleChange}
            />
            <Input
            type="number"
            text="Custo do Serviço"
            name="cost"
            placeholder="Insira o Valor Total"
            handleOnChange={handleChange}
            />
            <Input
            type="text"
            text="Descrição do Serviço"
            name="description"
            placeholder="Descreva o Serviço"
            handleOnChange={handleChange}
            />
            <SubmitButton text={textBtn}/>
        </form>
    )
}