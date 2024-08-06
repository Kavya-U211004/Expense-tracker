import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Transaction() {
    const { getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    return (

            <InnerLayout>
                <h1>All Transactions</h1>
                    <div className="chart-con">
                        <Chart />
                     </div>
            </InnerLayout>

    )
}


export default Transaction