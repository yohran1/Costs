import style from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/container'

export default function Project(){

    const {id} = useParams()

    const [project, setProject] = useState([])
    const [mostrarProjeto, setMostrarProjeto] = useState(false)

    useEffect(()=>{
        setTimeout(()=>{
            fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'Application-json',
            },
        }).then(res => res.json())
        .then(data => setProject(data))
        .catch(error => console.log(error))
        }, 2000)
    }, [id])

    function alternarProjetoFrom(){
        setMostrarProjeto(!mostrarProjeto)
    }

    return(
        <>
            {project.name ? 
            <div className={style.project_details}>
                <Container customClass="column">
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
                                <p>Detalhes do Projeto</p>
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