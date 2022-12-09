import './App.css'

function App() {
    return (
        <div className="container mx-auto px-2 my-8">
            <h1 className="inline-block mb-4 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">Застосування
                методу "Делфі"</h1>
            <div>Якісь вказівки</div>
            <div>
                <div className="grid grid-cols-6 text-center">
                    <div>№ Експерта</div>
                    <div>Коефіцієнт самооцінки</div>
                    <div>Рівень обслуговування</div>
                    <div className="col-end-7 col-span-3">Коментар</div>
                </div>
                <div className="grid grid-cols-6 text-center">
                    <div>1</div>
                    <div><input type="number" defaultValue="10"/></div>
                    <div><input type="number"/></div>
                    <div className="col-end-7 col-span-3">
                        <textarea name="comment" id="comment"></textarea>
                    </div>
                </div>
                <button>Обчислити результат</button>
            </div>
            <div>
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
