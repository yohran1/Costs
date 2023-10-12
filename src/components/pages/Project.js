import style from './Project.module.css'
import { parse, v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServicoForm from '../services/ServicoForm'

export default function Project(){

    const {id} = useParams()

    const [project, setProject] = useState([])
    const [mostrarProjeto, setMostrarProjeto] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    const [mostrarServicoForm, setMostrarServicoForm] = useState(false)

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
        setMessage('')
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

    function createService(){

        // Ultimo serviço
        const ultimoServico = project.services[project.services.length - 1]

        ultimoServico.id = uuidv4()

        const ultimoServicoCusto = ultimoServico.costs
        const newCusto = parseFloat(project.costs) + parseFloat(ultimoServicoCusto)

        // si passou do máximo valor que se tem no projeto
        if(newCusto > parseFloat(project.orcamento)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
            setType('error')
            project.services.pop()
            return false
        }
        // Adicionar custo de serviço ao custo total do projeto
        project.costs = newCusto

        //upDate project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(res => res.json())
        .then(data => {
            // exibir os services
            console.log(data)
        })
        .catch(error => console.log(error))
    }
    function alternarProjetoFrom(){
        setMostrarProjeto(!mostrarProjeto)
    }
    function alternarServicoFrom(){
        setMostrarServicoForm(!mostrarServicoForm)
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
                    <div className={style.service_form_container}>
                        <h2>Adicione um Serviço:</h2>
                        <button className={style.btn} onClick={alternarServicoFrom}>
                            {!mostrarServicoForm ? 'Adicionar Serviço' : 'Fechar'}
                        </button>
                        <div className={style.project_info}>
                            {mostrarServicoForm && 
                                <ServicoForm 
                                mudancaSubmit={createService}
                                textBtn="Adicionar Serviço"
                                projectData={project}
                                />
                            }
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        <p>Itens do projeto</p>
                    </Container>
                </Container>
            </div>
            
             : 
             <Loading /> }
        </>
    )
}