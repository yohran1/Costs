import ProjectForm from '../project/ProjectForm'
import style from './NewProject.module.css'
import { useNavigate } from 'react-router-dom';

export default function NewProject(){

    const navigate = useNavigate();

    function createPost(project){

        // Inicializar o projeto costs e serviços
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            // Redirect
            navigate('/projects', { state: { message: 'Projeto Criado Com Sucesso!' } })        })
        .catch(error => console.log(error))
    }

    return (
        <div className={style.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}