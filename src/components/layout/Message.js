import style from './Message.module.css'
import React, {useState, useEffect} from 'react'

export default function Message({type, msg}){

    const [visible, setVisible] = useState(false)
    
    useEffect(()=>{
        if(!msg){
            setVisible(false)
            return
        }else{
            setVisible(true)

            const timer = setTimeout(()=>{
                setVisible(false)
            }, 2000)    
            return ()=> clearTimeout(timer)
        }
    },[msg])

    return(
        <>
            {visible && (
                <div className={`${style.message} ${style[type]}`}>{msg}</div>
            )}
        </>
    )
}