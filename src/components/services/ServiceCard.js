import style from '../project/ProjectCard.module.css'
import {BsFillTrashFill} from 'react-icons/bs'

export default function ServiceCard({id, name, orcamento, description, handleRemove}){

    const remove = (event) => {
        event.preventDefault()
        handleRemove(id, orcamento)
    }

    return(
        <div className={style.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> R${orcamento}
            </p>
            <p>{description}</p>
            <div className={style.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>
            </div>
        </div>
    )
}