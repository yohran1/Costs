import style from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import { useEffect, useState } from 'react'

export default function ProjectForm({btnText}){
    const [categories, setCategories] = useState([])
    useEffect(()=>{
        fetch("http://localhost:5000/categories", {
        method: "GET",
        headers: {
            'content-type': 'application/json',
        },
    }).then(res => res.json())
    .then(data => {
        setCategories(data)
    })
    .catch(error => console.log(error))
    },[])

    return(
        <form className={style.form}>
            <Input 
            type="text" 
            text="Nome do Projeto" 
            name="name" 
            placeholder="Insira o nome do projeto" 
            />
            <Input 
            type="number" 
            text="Orçamento do Projeto" 
            name="orcamento" 
            placeholder="Insira o orçamento total" 
            />

            <Select name="category_id" text="Selecione a Categoria" options={categories}/>
            
            <SubmitButton text={btnText} />
        </form>
    )
}