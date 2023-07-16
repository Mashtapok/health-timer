import {useEffect, useState} from 'react'
import {formatTime} from "../../utils"
import './Timer.css'

const deadline = 2 * 60

export function Timer() {
    const [count, setCount] = useState(deadline)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => --prev)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="Timer">
            <p>{formatTime(count)}</p>
        </div>
    )
}