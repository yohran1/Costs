import style from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'

export default function Project(){

    const {id} = useParams()

    const [project, setProject] = useState([])
    const [mostrarProjeto, setMostrarProjeto] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(()=>{
        setTimeout(()=>{
            fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'Application-json',
            },
        }).then(res => res.json())
        .then(data => {
            setProject(data)
        })
        .catch(error => console.log(error))
        }, 800)
    }, [id])

    function editPost(project){
        // validação de orçamento

        if(project.orcamento < project.costs){
            // message
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false    // Assim que detectar que o orçamento é menor que o custo ele retornará false e não deixará continuar a edição.
        }
            fetch(`http://localhost:5000/projects/${project.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(project),
            })
            .then(res => res.json())
            .then(data => {
                setProject(data)
                setMostrarProjeto(false)    //  Esconde o formulário quando termina a edição
                //message
                setMessage('Projeto Atualizado!')
                setType('success')
            })
            .catch(error => console.log(error))
        
    }

    function alternarProjetoFrom(){
        setMostrarProjeto(!mostrarProjeto)
    }

    return(
        <>
            {project.name ? 
            <div className={style.project_details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message} />}
                    <div className={style.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={style.btn} onClick={alternarProjetoFrom}>
                            {!mostrarProjeto ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!mostrarProjeto ? 
                            <div className={style.project_info}>
                                <p>
                                    <span>Categoria: </span>{project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento: R$</span>{project.orcamento}
                                </p>
                                <p>
                                    <span>Total Utilizado: R$</span>{project.costs}
                                </p>
                            </div>
                        : 
                            <div className={style.project_info}>
                                <ProjectForm 
                                handleSubmit={editPost}
                                btnText="Concluir Edição!"
                                projectData={project}
                                />
                            </div>
                        }
                    </div>
                </Container>
            </div>
            
             : 
             <Loading /> }
        </>
    )
}