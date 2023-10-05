import style from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import { useEffect, useState } from 'react'

export default function ProjectForm({ handleSubmit ,btnText, projectData }){
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})
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

    const submit = (event) => {
        event.preventDefault()
        handleSubmit(project)
        console.log(project)
    }

    function handleChange(event){
        setProject({...project, [event.target.name]: event.target.value})
    }
        function handleCategory(event){
        setProject({...project, category: {
            id: event.target.value,
            name: event.target.options[event.target.selectedIndex].text,

        }})
    }

    return(
        <form onSubmit={submit} className={style.form}>
            <Input 
            type="text" 
            text="Nome do Projeto" 
            name="name" 
            placeholder="Insira o nome do projeto" 
            handleOnChange={handleChange}
            value={project.name ? project.name : ''}
            />
            <Input 
            type="number" 
            text="Orçamento do Projeto" 
            name="orcamento" 
            placeholder="Insira o orçamento total" 
            handleOnChange={handleChange}
            value={project.orcamento ? project.orcamento : ''}
            />

            <Select 
            name="category_id" 
            text="Selecione a Categoria" 
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''}
            />
            
            <SubmitButton text={btnText} />
        </form>
    )
}