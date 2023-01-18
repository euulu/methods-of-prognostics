import {useEffect, useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';

function App() {
    const [realValues, setRealValues] = useState([18504.5, 19357, 20573, 20800.8, 21042.7, 21244.38, 21287.7]);
    const [calculatedValues, setCalculatedValues] = useState(['-', '-', '-', '-', '-']);

    const {control, register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            'values': realValues,
        },
    });

    const {fields} = useFieldArray({
        control,
        name: 'values',
    });

    const calculatePredictionValues = (values) => {
        const predictedValues = [];
        const f5 = parseFloat(((values[0] * 8 + values[1] * 12 + values[2] * 20 + values[3] * 60) / 100).toFixed(1));
        const f6 = parseFloat(((values[1] * 8 + values[2] * 12 + values[3] * 20 + values[4] * 60) / 100).toFixed(1));
        const f7 = parseFloat(((values[2] * 8 + values[3] * 12 + values[4] * 20 + values[5] * 60) / 100).toFixed(1));
        const f8 = parseFloat(((values[3] * 8 + values[4] * 12 + values[5] * 20 + values[6] * 60) / 100).toFixed(1));
        const f9 = parseFloat(((values[4] * 8 + values[5] * 12 + values[6] * 20 + f8 * 60) / 100).toFixed(1));
        predictedValues.push(f5, f6, f7, f8, f9);
        return [...predictedValues];
    };

    const formSubmit = (data) => {
        const values = data.values;
        setRealValues((prevState) => [...values]);
        setCalculatedValues((prevState) => {
            return calculatePredictionValues(values);
        });
    };

    useEffect(() => {
        setCalculatedValues((prevState) => {
            return calculatePredictionValues(realValues);
        });
    }, []);

    const chartRealValData = realValues.map((value, index) => {
        return {category: index + 1, value: value};
    });
    const chartPredictedValData = calculatedValues.map((value, index) => {
        return {category: 5 + index, value: value};
    });

    const series = [
        {
            name: 'Ціна',
            data: chartRealValData,
            color: '#000',
        },
        {
            name: 'Розраховане ЗКС',
            data: chartPredictedValData,
            color: '#8884d8'
        },
    ];

    return (
        <div className="container max-w-screen-lg mx-auto px-2 py-8">
            <h1 className="inline-block mb-4 text-2xl sm:text-3xl font-extrabold">Метод зваженого рухомого
                середнього</h1>
            <div className="my-12">
                <h3>Карта таблиці</h3>
                <ol className="pl-4 list-decimal">
                    <li>Початкові значення заповнені актуальними, на момент здачі лабораторної даними.</li>
                    <li>Початкові дані можуть бути змінені корустувачем вручну.</li>
                    <li>Для розрахунку значення на момент часу 9 використовується розраховане зважене ковзне середнє для
                        моменту часу 8.
                    </li>
                </ol>
            </div>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div
                    className="grid grid-cols-11 gap-px bg-black text-center children:bg-white children:py-1 children:px-1.5 border solid border-black">
                    <div className="col-span-2 text-left">Моменту часу<br/>(день)</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div className="col-span-2 text-left">Значення у момент часу(ціна)</div>
                    {fields.map((field, index) => (
                        <div key={field.id}>
                            <input {...register(`values.${index}`)}
                                   type="number"
                                   step=".1"
                                   className="w-full text-center"/>
                        </div>
                    ))}
                    <div>-</div>
                    <div>-</div>
                    <div className="col-span-2 text-left">Розраховане зважене ковзне середнє</div>
                    <div>-</div>
                    <div>-</div>
                    <div>-</div>
                    <div>-</div>
                    {calculatedValues.map((predictedValue, i) => (
                        <div key={i} className="font-bold text-gray-500">{predictedValue}</div>
                    ))}
                </div>
                <button type="submit"
                        className="mt-8 block px-5 py-3 border border-solid border-black hover:bg-gray-50">Розрахувати
                </button>
            </form>
            <div className="mt-8">
                <LineChart width={700} height={400}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                    <XAxis dataKey="category"
                           type="category"
                           allowDuplicatedCategory={false}
                           padding={{left: 30, right: 30}}/>
                    <YAxis dataKey="value"
                           domain={['dataMin - 500', 'dataMax + 500']}
                           ticks={[17000, 19000, 21000]}/>
                    <Tooltip/>
                    <Legend verticalAlign="bottom" height={36}/>
                    {series.map((line) => (
                        <Line type="monotone"
                              dataKey="value"
                              data={line.data} name={line.name} key={line.name}
                              stroke={line.color}/>
                    ))}
                </LineChart>
            </div>
        </div>
    );
}

export default App
