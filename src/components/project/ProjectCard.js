import style from './ProjectCard.module.css'
import { Link } from 'react-router-dom'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

export default function ProjectCard({ id, name, orcamento, category, handleRemove }){

    const remove = (event) =>{
        event.preventDefault()
        handleRemove(id)
    }

    return(
        
            <div className={style.project_card}>
                <h4>{name}</h4>
                <p>
                    <span>Orçamento:</span> R${orcamento}
                </p>
                <p className={style.category_text}>
                    <span className={`${style[category.toLowerCase()]}`}></span> {category}
                </p>
                <div className={style.project_card_actions}>
                    <Link to={`/project/${id}`}>
                    <BsPencil />Editar
                    </Link>
                    <button onClick={remove}>
                        <BsFillTrashFill />Excluir
                    </button>
                </div>
            </div>
    
    )
}