import { useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import style from './Projects.module.css'
import Message from '../layout/Message'
import Container from '../layout/container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import Loading from '../layout/Loading'

export default function Projects(){

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()

    // const message = location.state && location.state.message
    let message = ''

    if(location.state){
        message = location.state.message
    }

    useEffect(()=>{
        setTimeout(()=>{
            fetch("http://localhost:5000/projects", {
            method: "GET",
            headers: {
                'content-type': 'application/json',
            },
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch(error => console.log(error))
        }, 2000)
    },[])

    function removeProject(id){

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
            }).then(res => res.json())
            .then(() => {
                setProjects(projects.filter((project) => project.id !== id))
                // Message
                setProjectMessage("Projeto Removido com sucesso!")
            })
            .catch(error => console.log(error)
            )
    }

    return(
        <div className={style.project_container}>
            <div className={style.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Novo Projeto" />
            </div>            
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {
                projects.length > 0 && projects.map((project) => (
                    <ProjectCard 
                    id={project.id}
                    name={project.name}
                    orcamento={project.orcamento}
                    category={project.category.name}
                    key={project.id}
                    handleRemove={removeProject}
                    />
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados</p>
                )}
            </Container>
        </div>
        
    )
}