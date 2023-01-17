import {useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function App() {
    const [realValues, setRealValues] = useState([17322.6, 17657.8, 18504.5, 19357, 20573, 20800.8, 21042.7]);
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

    const formSubmit = (data) => {
        const values = data ? data.values : [...calculatedValues];
        setRealValues((prevState) => [...values]);
        const predictedValues = [];
        const f5 = parseFloat(((values[0] * 8 + values[1] * 12 + values[2] * 20 + values[3] * 60) / 100).toFixed(1));
        const f6 = parseFloat(((values[1] * 8 + values[2] * 12 + values[3] * 20 + values[4] * 60) / 100).toFixed(1));
        const f7 = parseFloat(((values[2] * 8 + values[3] * 12 + values[4] * 20 + values[5] * 60) / 100).toFixed(1));
        const f8 = parseFloat(((values[3] * 8 + values[4] * 12 + values[5] * 20 + values[6] * 60) / 100).toFixed(1));
        const f9 = parseFloat(((values[4] * 8 + values[5] * 12 + values[6] * 20 + f8 * 60) / 100).toFixed(1));
        predictedValues.push(f5, f6, f7, f8, f9);
        setCalculatedValues((prevState) => {
            return [...predictedValues];
        });
    };

    const data = realValues.map((value, index) => {
        return {name: index + 1, uv: value};
    });

    return (
        <div className="container max-w-screen-lg mx-auto px-2 py-8">
            <h1 className="inline-block mb-4 text-2xl sm:text-3xl font-extrabold">Метод зваженого рухомого
                середнього</h1>
            <div className="my-12">
                <h3>Карта таблиці</h3>
                <ol className="pl-4 list-decimal">
                    <li>Початкові значення заповнені актуальними, на момент здачі лабораторної даними.</li>
                    <li>Початкові дані можуть бути змінені корустувачем вручну.</li>
                    <li>Для розрахунку значення на момент часу 9 використовується розраховане зважене ковзне середнє для моменту часу 8.</li>
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
                    <div className="col-span-2 text-left">Значення у момент часу</div>
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
                        className="mt-8 block px-5 py-3 border border-solid border-black hover:bg-gray-50">Розрахувати</button>
            </form>
            <div className="mt-8">
                <LineChart width={600} height={300} data={data}>
                    <Line type="monotone" dataKey="uv" stroke="#000" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </div>
        </div>
    );
}

export default App
