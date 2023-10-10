import style from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'

export default function Project(){

    const {id} = useParams()

    const [project, setProject] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'Application-json',
            },
        }).then(res => res.json())
        .then(data => setProject(data))
        .catch(error => console.log(error))
    }, [id])

    return(
        <p>{project.name}</p>
    )
}