import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Bitcoin.css'

const Bitcoin = () => {
    const [amount, setAmount] = useState(null)
    const [prevState, setPrevState] = useState(null)

    const api = async () => {
        // API returning only one amount so added a sample function to test

        // await setAmount((amount) => {
        //     setPrevState(amount)
        //     const list = [1, 2, 3, 4, 5]
        //     return list[Math.floor(Math.random() * 5)]
        // })

        await axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot')
            .then(res => {
                setAmount((amount) => {
                    setPrevState(amount)
                    return res.data.data.amount
                })
                console.log(res.data.data.amount)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        const apiCalls = setInterval(api, 1000)
        return () => {
            clearInterval(apiCalls)
        }
    }, [])

    return (
        <div className="bitcoin">
            {
                prevState !== amount
                    ? <div className="blink"> {amount} </div>
                    : <div> {amount} </div>
            }
        </div >
    )
}

export default Bitcoin
