import React, { FC, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './data.css';
import AccountMenu from '../../components/menu/menu'


export const Data1 = () => {
    const [chartData, setChartData] = useState({});
    const [employeeSalary, setEmployeeSalary] = useState([]);
    const [employeeAge, setEmployeeAge] = useState([]);


    const chart = () => {
        let empSal = [];
        let empAge = [];
        axios
            .get("http://dummy.restapiexample.com/api/v1/employees")
            .then(res => {
                console.log(res);
                for (const dataObj of res.data.data) {
                    empSal.push(parseInt(dataObj.employee_salary));
                    empAge.push(parseInt(dataObj.employee_age));
                }
                setChartData({
                    labels: empAge,
                    datasets: [
                        {
                            label: "level of thiccness",
                            data: empSal,
                            backgroundColor: ["rgba(75, 192, 192, 0.6)"],
                            borderWidth: 4
                        }
                    ]
                });
            })
            .catch(err => {
                console.log(err);
            });
        console.log(empSal, empAge);
    };

    useEffect(() => {
        chart();
    }, []);
    return (
        <div className="App">
            <h1>Employee Data</h1>
            <div>
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        title: { text: "THICCNESS SCALE", display: true },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 10,
                                        beginAtZero: true
                                    },
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ],
                            xAxes: [
                                {
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ]
                        }
                    }}
                />
            </div>

        </div>
    );
};