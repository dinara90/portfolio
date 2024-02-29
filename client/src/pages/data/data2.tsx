import React, { FC, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import './data.css';
import AccountMenu from '../../components/menu/menu'


const Data2: FC = () => {
    const [chartData, setChartData] = useState<any>({});
    const baseUrl = "https://api.coinranking.com/v2/coins/?limit=10&orderBy=price";
    const apiKey = "coinranking683c4d3456b81b67a6553417f1fd90881b20d03e06f42b21";

    const text = 'this graph shows you the list of coins, crypto, and prices';

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await axios.get(baseUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': apiKey,
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                console.log(response.data);
                setChartData(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCoins();
    }, [baseUrl, apiKey]);

    return (
        <div className={'App'}>
            <AccountMenu/>
            {chartData.coins && (
                <Bar
                    data={{
                        labels: chartData.coins.map((coin: any) => coin.name),
                        datasets: [{
                            label: `${chartData.coins.length} Coins Available`,
                            data: chartData.coins.map((coin: any) => coin.price),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    }}
                    height={400}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    max: 50000,
                                    beginAtZero: true
                                }
                            }]
                        },                        
                        plugins: {
                            legend: {
                                labels: {
                                    fontSize: 25 as any, // You can use '25' directly or cast it to 'any'
                                },
                            },                            
                        },
                    }}
                />
            )}
        </div>
    );
};

export default Data2;