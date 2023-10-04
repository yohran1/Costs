import ProjectForm from '../project/ProjectForm'
import style from './NewProject.module.css'

export default function NewProject(){
    return (
        <div className={style.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm />
        </div>
    )
}