import {useFieldArray, useForm} from 'react-hook-form';
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
            <h1 className="inline-block mb-4 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">Застосування
                методу "Делфі"</h1>
            <div className="my-12">Якісь вказівки</div>
            <div className="my-12">
                <div className="grid grid-cols-6 text-center">
                    <div>№ Експерта</div>
                    <div>Коефіцієнт самооцінки</div>
                    <div>Рівень обслуговування</div>
                    <div className="col-end-7 col-span-3">Коментар</div>
                </div>
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    {fields.map((field, index) => (
                        <div key={field.id}
                             className="grid grid-cols-6 text-center">
                            <div>{index + 1}</div>
                            <div>
                                <input {...register(`experts.${index}.selfEsteem`)}/>
                            </div>
                            <div>
                                <input {...register(`experts.${index}.rating`)}/>
                            </div>
                            <div className="col-end-7 col-span-3">
                                <textarea {...register(`experts.${index}.comment`)}></textarea>
                            </div>
                        </div>
                    ))}
                    <button onClick={addExpert}>Додати експерта</button>
                    <br/>
                    <button type="submit">Обчислити результат</button>
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
