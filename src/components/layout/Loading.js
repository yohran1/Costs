import style from './Loading.module.css'
import loading from '../../img/loading.svg'


export default function Loading(){

    return(
        <div className={style.loader_container}>
            <img className={style.loader} src={loading} alt="Loading"/>
        </div>
    )
}