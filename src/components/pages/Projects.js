import { useLocation } from 'react-router-dom'

export default function Projects(){
    const location = useLocation()

    const message = location.state && location.state.message

    return(
        <div>
            <h1>Projects</h1>
            {message && <div>{message}</div>}
        </div>
        
    )
}