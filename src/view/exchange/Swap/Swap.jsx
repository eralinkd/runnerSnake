import React, { useState } from "react";

import SwapCard from './SwapCard/SwapCard';
import clsx from 'clsx';
import scoin from '../../../assets/scoin.png';
import styles from './Swap.module.scss';
import ton from '../../../assets/ton.png';

const swapCards = [
    {
        type: "send",
        gradient: "linear-gradient(106.24deg, rgb(92, 106, 196) -3.53%, rgb(156, 39, 176) 117.96%)",
        coin: "SCoin",
        coinImg: scoin,
    },
    {
        type: "receive",
        gradient: "linear-gradient(90deg, rgb(54, 209, 220), rgb(91, 134, 229))",
        coin: "TON",
        coinImg: ton,
    }
]

const Swap = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <SwapCard props={swapCards[0]}></SwapCard>
                <div className={styles.swapButtonContainer}>
                    <p className="f-14">1 SCoin = 0.001897645789 TON</p>
                    <button></button>
                </div>
                
                <SwapCard props={swapCards[1]}></SwapCard>
                <button type="button" className={styles.button}>
                    Вывести
                </button>
            </div>
        </section>
    )
}

export default Swap;