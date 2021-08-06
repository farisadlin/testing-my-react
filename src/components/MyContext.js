import React, { useContext } from 'react'
import {CountContext} from '../App'

const MyContext = () => {
    const {count, setCount} = useContext(CountContext)
    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        setCount(count - 1)
    }
    return (
        <>
        <h1 style={{textAlign: "center"}}>This is testing for React Context</h1>
        <div style={{display: "flex", justifyContent: "space-around", margin:"50px 0"}}>
            <button onClick={decrement}>-</button>
            <span>{count}</span>
            <button onClick={increment}>+</button>
        </div>
        </>
    )
}

export default MyContext
