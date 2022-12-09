import {useFieldArray, useForm} from 'react-hook-form';
import {AiTwotoneEdit} from 'react-icons/ai';
import './App.css'

function App() {
    const {control, register, handleSubmit} = useForm({
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
            selfEsteem: '-',
            rating: '-',
            comment: ''
        });
    };

    return (
        <div className="container mx-auto px-2 py-8">
            <h1 className="inline-block mb-4 text-2xl sm:text-3xl text-violet-850 font-extrabold tracking-tight dark:text-slate-200">Застосування
                методу "Делфі"</h1>
            <div className="my-12">
                <ul>
                    <li>самооцінка експерта оцінка від 1 до 10</li>
                    <li>оцінка обслуговування від 1 до 100</li>
                    <li>Дані можуть бути змінені <AiTwotoneEdit size="18" className="inline"/></li>
                </ul>
            </div>
            <div className="my-12">
                <div className="grid grid-cols-6 text-center">
                    <div
                        className="p-2 flex justify-center items-center border border-solid border-powder-blue-250/50 font-medium">
                        <p>№ Експерта</p>
                    </div>
                    <div
                        className="p-2 flex justify-center items-center border-r border-b border-t border-solid border-powder-blue-250/50 font-medium">
                        <p>Коефіцієнт самооцінки</p>
                    </div>
                    <div
                        className="p-2 flex justify-center items-center border-r border-b border-t border-solid border-powder-blue-250/50 font-medium">
                        <p>Рівень обслуговування</p>
                    </div>
                    <div
                        className="col-end-7 col-span-3 p-2 flex justify-center items-center border-r border-b border-t border-solid border-powder-blue-250/50 font-medium">
                        <p>Коментар</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    {fields.map((field, index) => (
                        <div key={field.id}
                             className="grid grid-cols-6 text-center hover:bg-white/10">
                            <div
                                className="p-2 flex justify-center items-center border-l border-r border-b border-solid border-powder-blue-250/50">
                                <p>{index + 1}</p>
                            </div>
                            <div className="border-r border-b border-powder-blue-250/50 flex hover:bg-white/10">
                                <input {...register(`experts.${index}.selfEsteem`)}
                                       className="px-1 inline-block w-full text-center bg-transparent active:bg-white/20 focus:bg-white/20 outline-none"/>
                            </div>
                            <div className="border-r border-b border-powder-blue-250/50 flex hover:bg-white/10">
                                <input {...register(`experts.${index}.rating`)}
                                       className="px-1 inline-block w-full text-center bg-transparent active:bg-white/20 focus:bg-white/20 outline-none"/>
                            </div>
                            <div
                                className="col-end-7 col-span-3 border-r border-b border-powder-blue-250/50 flex hover:bg-white/10">
                                <textarea {...register(`experts.${index}.comment`)}
                                          className="px-2 py-1 inline-block w-full bg-transparent active:bg-white/20 focus:bg-white/20 outline-none"></textarea>
                            </div>
                        </div>
                    ))}
                    <div className="my-8 flex justify-between">
                        <button onClick={addExpert}
                                className="block px-5 py-3 rounded-md border border-solid border-powder-blue-250/50 bg-white/20 hover:bg-white/50">Додати експерта
                        </button>
                        <button type="submit"
                                className="block px-5 py-3 rounded-md border border-solid border-powder-blue-250/50 bg-white/20 hover:bg-white/50">Обчислити результат
                        </button>
                    </div>
                </form>
            </div>
            <div className="my-12">
                <p>Середньогрупова оцінка: </p>
                <p>Середнє значення оцінки послуг: </p>
                <p>Середньозважена оцінка попиту: </p>
                <p>Медіана: </p>
                <p>Нижня межа довірчої області: . Верхня межа довірчої області: .</p>
                <p>Довірчий інтервал: .</p>
            </div>
        </div>
    )
}

export default App
