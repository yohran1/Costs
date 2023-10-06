import { useLocation } from 'react-router-dom'
import Message from '../layout/Message'

export default function Projects(){
    const location = useLocation()

    // const message = location.state && location.state.message
    let message = ''

    if(location.state){
        message = location.state.message
    }

    return(
        <div>
            <h1>Meus Projetos</h1>
            
            {message && <Message type="success" msg={message} />}
        </div>
        
    )
}