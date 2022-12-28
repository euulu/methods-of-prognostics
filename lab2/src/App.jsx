import {useFieldArray, useForm} from 'react-hook-form';
import {AiTwotoneEdit} from 'react-icons/ai';
import './App.css'
import {useState} from 'react';

function App() {
    const [data, setData] = useState({});
    const [results, setResults] = useState({
        averageGroup: 0,
        averageResult: 0,
        averageWeighted: 0,
        median: 0,
        lowTrust: 0,
        highTrust: 0,
        trustInterval: 0,
    });

    const handleSetData = (newData) => {
        const experts = newData.experts;

        setData((prevState) => {
            return {
                ...prevState,
                experts,
            };
        });
    };

    const handleSetResults = (input) => {
        // Calculate basic values of submitted data for the upcoming calculations.
        const experts = input.experts;
        const groupCount = experts.length;
        const groupRatingValues = experts.map((expertData) => expertData.selfEsteem);
        const answerRatingValues = experts.map((expertData) => expertData.rating);
        const lowestAnswer = Math.min(...answerRatingValues);
        const highestAnswer = Math.max(...answerRatingValues);
        const quartile = (highestAnswer - lowestAnswer) / 4;

        // Sum of the expert and answer ratings.
        const averageSum = groupRatingValues.reduce((a, b) => (a + b));
        const resultSum = answerRatingValues.reduce((a, b) => (a + b));
        const avrgResMultiplicationSum = groupRatingValues
            .map((rating, index) => rating * answerRatingValues[index])
            .reduce((a, b) => a + b);

        // Result data calculations.
        const averageGroup = parseFloat((averageSum / groupCount).toFixed(3));
        const averageResult = parseFloat((resultSum / groupCount).toFixed(3));
        const averageWeighted = parseFloat((avrgResMultiplicationSum / averageSum).toFixed(3));
        let median = 'Для обчислення медіани потрібна парна кількість експертів.';
        if (groupCount % 2 === 0) {
            const middle = groupCount / 2;
            median = parseFloat(((answerRatingValues[middle - 1] + answerRatingValues[middle]) / 2).toFixed(3));
        }
        const lowTrust = parseFloat((lowestAnswer + quartile).toFixed(3));
        const highTrust = parseFloat((highestAnswer - quartile).toFixed(3));
        const trustInterval = highTrust - lowTrust;

        setResults((prevState) => {
            return {
                ...prevState,
                averageGroup: averageGroup,
                averageResult: averageResult,
                averageWeighted: averageWeighted,
                median: median,
                lowTrust: lowTrust,
                highTrust: highTrust,
                trustInterval: trustInterval,
            };
        });
    };

    const {control, register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            experts: [
                {
                    selfEsteem: 9,
                    rating: 90,
                    comment: 'Чудово відпочив',
                },
                {
                    selfEsteem: 3,
                    rating: 30,
                    comment: 'Послали в "гарячу" точку',
                },
                {
                    selfEsteem: 9,
                    rating: 60,
                    comment: 'Непогано за свої гроші',
                },
                {
                    selfEsteem: 7,
                    rating: 80,
                    comment: 'Добре годували, добре поїли',
                },
                {
                    selfEsteem: 5,
                    rating: 70,
                    comment: 'Затримали рейс, але в цілому нормально',
                },
                {
                    selfEsteem: 8,
                    rating: 70,
                    comment: 'Харчування - не дуже',
                },
                {
                    selfEsteem: 9,
                    rating: 50,
                    comment: 'Обіцяли 5-ти зірковий готель, а на місці виявився 3-ох',
                },
                {
                    selfEsteem: 7,
                    rating: 70,
                    comment: 'Погане відношення персоналу, хоча відпочинок виявився непоганий',
                },
            ],
        }
    });

    const {fields, append} = useFieldArray({
        control,
        name: 'experts',
    });

    const addExpert = () => {
        return append({
            selfEsteem: 0,
            rating: 0,
            comment: 'Будьласка, залиште ваш відгук.'
        });
    };

    const formSubmit = (newFormData) => {
        handleSetData(newFormData);
        handleSetResults(newFormData);
    };

    return (
        <div className="bg-white/80">
            <div className="container mx-auto px-2 py-8">
                <h1 className="inline-block mb-4 text-2xl sm:text-3xl text-violet-850 font-extrabold tracking-tight dark:text-slate-200">Застосування
                    методу "Делфі"</h1>
                <div className="my-12">
                    <ol className="pl-4 list-decimal">
                        <li>Коефіцієнт самооцінки експерта оцінюється цілими числами від 1 до 10.</li>
                        <li>Оцінка рівня обслуговування проводиться цілими числами в діапазоні від 1 до 100.</li>
                        <li>Ваш коментар щодо відпочинку є обов'язковим до заповнення.</li>
                    </ol>
                </div>
                <div className="my-12">
                    <div className="grid grid-cols-6 text-center">
                        <div
                            className="p-2 flex justify-center items-center border-t border-r border-l border-solid border-powder-blue-250/50 font-medium">
                            <p>№ Експерта</p>
                        </div>
                        <div
                            className="p-2 flex justify-center items-center border-r border-t border-solid border-powder-blue-250/50 font-medium">
                            <p>Коефіцієнт самооцінки</p>
                        </div>
                        <div
                            className="p-2 flex justify-center items-center border-r border-t border-solid border-powder-blue-250/50 font-medium">
                            <p>Рівень обслуговування</p>
                        </div>
                        <div
                            className="col-end-7 col-span-3 p-2 flex justify-center items-center border-r border-t border-solid border-powder-blue-250/50 font-medium">
                            <p>Коментар</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <div className="border-b border-solid border-powder-blue-250/50">
                            {fields.map((field, index) => (
                                <div key={field.id}>
                                    <div
                                        className="grid grid-cols-6 text-center border-l border-t border-solid border-powder-blue-250/50 hover:bg-white/10">
                                        <div
                                            className="p-2 flex justify-center items-center border-r border-solid border-powder-blue-250/50">
                                            <p>{index + 1}</p>
                                        </div>
                                        <div className="border-r border-powder-blue-250/50 flex hover:bg-white/10">
                                            <input {...register(`experts.${index}.selfEsteem`, {
                                                valueAsNumber: true,
                                                min: 1,
                                                max: 10,
                                            })}
                                                   type="number"
                                                   className="px-1 inline-block w-full text-center bg-transparent active:bg-white/20 focus:bg-white/20 outline-none"/>
                                        </div>
                                        <div className="border-r border-powder-blue-250/50 flex hover:bg-white/10">
                                            <input {...register(`experts.${index}.rating`, {
                                                valueAsNumber: true,
                                                min: 1,
                                                max: 100,
                                            })}
                                                   type="number"
                                                   className="px-1 inline-block w-full text-center bg-transparent active:bg-white/20 focus:bg-white/20 outline-none"/>
                                        </div>
                                        <div
                                            className={`col-end-7 col-span-3 border-r border-powder-blue-250/50 flex hover:bg-white/10 ${errors.experts?.[index]?.comment ? 'field-error' : ''}`}>
                                <textarea {...register(`experts.${index}.comment`, {required: true})}
                                          className="px-2 py-1 inline-block w-full bg-transparent active:bg-white/20 focus:bg-white/20 outline-none"></textarea>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="my-8 flex justify-between">
                            <button onClick={addExpert}
                                    className="block px-5 py-3 rounded-md border border-solid border-powder-blue-250/50 bg-white/20 hover:bg-white/50">Додати
                                експерта
                            </button>
                            <button type="submit"
                                    className="block px-5 py-3 rounded-md border border-solid border-powder-blue-250/50 bg-white/20 hover:bg-white/50">Обчислити
                                результат
                            </button>
                        </div>
                    </form>
                </div>
                <div className="my-12">
                    <p>Середньогрупова оцінка: {results.averageGroup}</p>
                    <p>Середнє значення оцінки послуг: {results.averageResult}</p>
                    <p>Середньозважена оцінка попиту: {results.averageWeighted}</p>
                    <p>Медіана: {results.median}</p>
                    <p>Нижня межа довірчої області: {results.lowTrust}%. Верхня межа довірчої
                        області: {results.highTrust}%.</p>
                    <p>Довірчий інтервал: {results.trustInterval}%.</p>
                    {results.trustInterval > 20 &&
                        <p>Довірчий інтервал виходить за межі максимально допустимого. Необхідно провести
                            переголосування.</p>}
                </div>
            </div>
        </div>
    )
}

export default App
