import {useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';

function App() {
    const [realValues, setRealValues] = useState([]);
    const [calculatedValues, setCalculatedValues] = useState({
        nextPeriod: 0,
        afterNextPeriod: 0,
    });

    const {control, register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            'values': ['-', '-', '-', '-', '-', '-', '-'],
        },
    });

    const {fields} = useFieldArray({
        control,
        name: 'values',
    });

    return (
        <div className="container max-w-screen-lg mx-auto px-2 py-8">
            <h1 className="inline-block mb-4 text-2xl sm:text-3xl font-extrabold">Метод зваженого рухомого
                середнього</h1>
            <div className="my-12">
                <h3>Карта таблиці</h3>
                <ol className="pl-4 list-decimal">
                    <li>Початкові значення заповнюються даними з API сервісу.</li>
                    <li>Вихідні дані можуть бути змінені корустувачем вручну.</li>
                </ol>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-11 gap-px bg-black children:bg-white children:py-1 children:px-1.5 border solid border-black">
                    <div className="col-span-2">Моменту часу<br/>(день)</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div className="col-span-2">Значення у момент часу</div>
                    {fields.map((field, index) => (
                        <div key={field.id}>
                            <input {...register(`values.${index}`)}
                                   type="number"
                                   className="w-full"/>
                        </div>
                    ))}
                    <div>-</div>
                    <div>-</div>
                    <div className="col-span-2">Розраховане зважене ковзне середнє</div>
                    <div>-</div>
                    <div>-</div>
                    <div>-</div>
                    <div>-</div>
                    <div>-</div>
                    <div>-</div>
                    <div>-</div>
                    <div>calculated 1</div>
                    <div>calculated 2</div>
                </div>
                <button type="submit">Розрахувати</button>
            </form>
            <div>Graph</div>
        </div>
    );
}

export default App
