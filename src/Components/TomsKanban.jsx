import React, {useEffect, useState} from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "motion/react";
import { FaFire } from "react-icons/fa";


export function getCategories(){
    const cats = JSON.parse(localStorage.getItem('categories'))

    if(!cats){
        return []
    } else return cats
}

export function getColumns() {
    const cols = JSON.parse(localStorage.getItem('columns'))

    if (!cols) {
        return []
    } else return cols

}
export function getCards(){
    const cards = JSON.parse(localStorage.getItem('cards'))

    if(!cards){
        return []
    } else return cards
}

export function getFilteredCards(){
    const cards = JSON.parse(localStorage.getItem('filteredCards'))

    if(!cards){
        return []
    } else return cards
}

export const TomsKanban = () => {
    return (
        <div className="h-screen w-full bg-neutral-900 text-neutral-50">
            <Board />
        </div>
    );
};

const Board = () => {
    const [cards, setCards] = useState(getCards);
    const [columns, setColumns] = useState(getColumns)
    const [openModal, setOpenModal] = useState(false)
    const [currentModalValue, setCurrentModalValue] = useState('')
    const [allCategories, setAllCategories] = useState(getCategories)
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)
    const [currentCategoryValue, setCurrentCategoryValue] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [setFilter, setSetFilter] = useState('')
    const [filteredCards, setFilteredCards] = useState(getFilteredCards)
    const [categoryColor, setCategoryColor] = useState('')

    useEffect(() => {
        localStorage.setItem('cards', JSON.stringify(cards) )
    }, [cards]);

    useEffect(() => {
        localStorage.setItem('filteredCards', JSON.stringify(filteredCards))
    }, [filteredCards]);

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(allCategories) )
    }, [allCategories]);


    useEffect(() => {
        localStorage.setItem('columns', JSON.stringify(columns))
    }, [columns]);

    function getMeTheCss(color){
        if (color === 'red') {
            return 'text-red-500 border border-red-500 border-dotted px-2 py-1 rounded-3xl bg-red-500 bg-opacity-20'
        } else if (color === 'pink') {
            return 'text-pink-500 border border-pink-500 border-dotted px-2 py-1 rounded-3xl bg-red-500 bg-opacity-20'
        } else if (color === 'blue') {
            return 'text-blue-500 border border-blue-500 border-dotted px-2 py-1 rounded-3xl bg-blue-500 bg-opacity-20'
        } else if (color === 'yellow') {
            return 'text-yellow-500 border border-yellow-500 border-dotted px-2 py-1 rounded-3xl bg-yellow-500 bg-opacity-20'
        } else if (color === 'green') {
            return 'text-green-500 border border-green-500 border-dotted px-2 py-1 rounded-3xl bg-green-500 bg-opacity-20'
        }
    }

    const addNewColumn = (columnName) => {
        setColumns( prev => [...prev, columnName])
        setCurrentModalValue('')
        setOpenModal(false)
    }

    useEffect(() => {
        setFilteredCards(cards.filter(eachCard => eachCard.category === setFilter))
    }, [cards]);

    function handleSettingFilter(filterVal){
        setSetFilter(filterVal)
        setFilteredCards(cards.filter(eachCard => eachCard.category === filterVal))
    }

    function changeModalValue(e) {
        setCurrentModalValue(e.target.value)
    }

    function handleCategoryAddition(newCat, catColor){
        setAllCategories(prev => [...prev, {name: newCat, color: catColor}])
    }


    function catColorSetter(e){
        setCategoryColor(e.target.value)
    }
    return (<div className='font-satoshi'>
            <div className='flex px-5 py-5 bg-gray-900'>
            <div onClick={() => {
                setOpenModal(true)
                setCategoryModalOpen(false)
                setShowFilters(false)
            }}
                 className={` bg-black w-fit py-3 px-3 rounded-lg hover:cursor-pointer font-medium ml-4 hover:bg-opacity-90 duration-200`}>Add
                Column
            </div>
                <div onClick={() => {
                    setCategoryModalOpen(true)
                    setOpenModal(false)
                    setShowFilters(false)
                }}
                 className={` bg-black w-fit py-3 px-3 rounded-lg hover:cursor-pointer font-medium ml-4 hover:bg-opacity-90 duration-200`}> Add/Manage
                Categories
            </div>


            <div
                 className={` bg-black w-fit py-3 px-3 rounded-lg hover:cursor-pointer font-medium ml-4 hover:bg-opacity-90 duration-200`} onClick={() => {
                     setShowFilters(prev => !prev)
                setCategoryModalOpen(false)
                setOpenModal(false)
                 }
            }> Filter







            </div>

            </div>

            {(showFilters && allCategories.length > 0) && <div className='text-white bg-black w-fit absolute left-[385px] py-4 px-12 rounded-md top-20'>
                {allCategories.map(each => <div className={getMeTheCss(each.color)}  onClick={() => handleSettingFilter(each.name)}>{each.name}</div>)}
            </div>}


            {(showFilters && allCategories.length === 0) && <div className='bg-black w-fit absolute left-[385px] py-4 px-12 rounded-md top-20'>No categories added.</div> }


        {setFilter !== '' &&  <div onClick={() => {
                setSetFilter('')
                setFilteredCards(cards)
            }} className='bg-red-600 w-fit px-5 py-1 rounded-md hover:cursor-pointer'>Cancel Filtering</div>}


            {categoryModalOpen &&
                <div className='bg-black px-4  w-fit absolute left-[170px] top-20 rounded-b-xl rounded-tr-xl pb-4'>
                    <input autoFocus className='bg-black  mt-4 py-2 px-4 border rounded-md
       ' type="text" placeholder='Add new category name here' value={currentCategoryValue}
                           onChange={(e) => setCurrentCategoryValue(e.target.value)}/>

                    <div className='flex mt-4'>
                    <div>Select a color: </div>
                        <div className='flex flex-wrap max-w-16'>
                            <div className={`bg-red-500 rounded-full min-w-5 min-h-5 h-5 w-5 ${categoryColor === 'red' && 'border-white border-2'}`} onClick={() => setCategoryColor('red')}> </div>
                            <div className={`bg-blue-500 rounded-full min-w-5 min-h-5 h-5 w-5 ${categoryColor === 'blue' && 'border-white border-2'}`} onClick={() => setCategoryColor('blue')}> </div>
                            <div className={`bg-yellow-500 rounded-full min-w-5 min-h-5 h-5 w-5 ${categoryColor === 'yellow' && 'border-white border-2'}`} onClick={() => setCategoryColor('yellow')}> </div>
                            <div className={`bg-green-500 rounded-full min-w-5 min-h-5 h-5 w-5 ${categoryColor === 'green' && 'border-white border-2'}`} onClick={()=> setCategoryColor('green')}> </div>
                            <div className={`bg-pink-500 rounded-full min-w-5 min-h-5 h-5 w-5 ${categoryColor === 'pink' && 'border-white border-2'}`} onClick={() => setCategoryColor('pink')}></div>
                        </div>

                    </div>
                    <div className='flex'>
                        <div onClick={() => handleCategoryAddition(currentCategoryValue, categoryColor)}
                             className='bg-black  mt-3 px-2 py-1.5 w-fit rounded-lg hover:bg-opacity-10 hover:cursor-pointer mx-auto hover:border-white border border-black border-opacity-5'>Add
                            Category
                        </div>
                        <div onClick={() => setCategoryModalOpen(false)}
                             className='bg-black  mt-3 px-2 py-1.5 w-fit rounded-lg hover:bg-opacity-10 hover:cursor-pointer mx-auto hover:border-white border border-black border-opacity-5'>Cancel
                        </div>
                    </div>

                    {allCategories.map(eachCat => <div className={`${getMeTheCss(eachCat.color)} w-fit`}>{eachCat.name}</div>)}


                </div>}


            {openModal &&
                <div className='bg-black px-4  w-fit absolute left-9 top-20 rounded-b-xl rounded-tr-xl pb-4'>
                    <input autoFocus className='bg-black border autofocus mt-4 py-2 px-4 rounded-md
       ' type="text" placeholder='' value={currentModalValue}
                           onChange={(e) => changeModalValue(e)}/>

                    <div className='flex'>
                        <div onClick={() => addNewColumn(currentModalValue)}
                             className='bg-black  mt-3 px-2 py-1.5 w-fit rounded-lg hover:bg-opacity-10 hover:cursor-pointer mx-auto hover:border-white border border-black border-opacity-5'>Add
                            Modal
                        </div>
                        <div onClick={() => setOpenModal(false)}
                             className='bg-black  mt-3 px-2 py-1.5 w-fit rounded-lg hover:bg-opacity-10 hover:cursor-pointer mx-auto hover:border-white border border-black border-opacity-5'>Cancel
                        </div>
                    </div>
                </div>}

            <div className="flex h-full w-full gap-3 overflow-x-auto p-12">

                {columns.map(eachCol => <Column title={eachCol} column={eachCol.toLowerCase()} cards={ setFilter === '' ? cards : filteredCards}
                                                setCards={setFilter === '' ? setCards : setFilteredCards} allCats={allCategories} cssFunc={getMeTheCss}/>)}
                {columns.length > 0  && <BurnBarrel setCards={setCards}/>}
            </div>
        </div>
    );
};

const Column = ({title, cards, column, setCards, allCats, cssFunc}) => {
    const [active, setActive] = useState(false);

    const handleDragStart = (e, card) => {
        e.dataTransfer.setData("cardId", card.id);
    };

    const handleDragEnd = (e) => {
        const cardId = e.dataTransfer.getData("cardId");

        setActive(false);
        clearHighlights();

        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        if (before !== cardId) {
            let copy = [...cards];

            let cardToTransfer = copy.find((c) => c.id === cardId);
            if (!cardToTransfer) return;
            cardToTransfer = { ...cardToTransfer, column };

            copy = copy.filter((c) => c.id !== cardId);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.id === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }

            setCards(copy);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        highlightIndicator(e);

        setActive(true);
    };

    const clearHighlights = (els) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => {
            i.style.opacity = "0";
        });
    };

    const highlightIndicator = (e) => {
        const indicators = getIndicators();

        clearHighlights(indicators);

        const el = getNearestIndicator(e, indicators);

        el.element.style.opacity = "1";
    };

    const getNearestIndicator = (e, indicators) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();

                const offset = e.clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );

        return el;
    };

    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    };

    const handleDragLeave = () => {
        clearHighlights();
        setActive(false);
    };

    const filteredCards = cards.filter((c) => c.column === column);

    return (
        /* This is the heading for a column - I've taken out all the relatively unnecessary stuff */
        <div className="w-56">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium text-white`}>{title}</h3>
                {/* Taken this out bc I don't think this matters much - <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span> */}


            </div>

            {/* This is the beefier div, you've got the main content body in here. */}
            <div
                onDrop={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`h-full w-full transition-colors ${
                    active ? "bg-neutral-800/50" : "bg-neutral-800/0"
                }`}
            >
                {filteredCards.map((c) => {
                    return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
                })}
                <DropIndicator beforeId={null} column={column} />
                <AddCard column={column} setCards={setCards} allCategories={ allCats} cssFunc={cssFunc} />
            </div>
        </div>
    );
};

const Card = ({ title, id, column, handleDragStart, category }) => {
    return (
        <>
            <DropIndicator beforeId={id} column={column} />
            <motion.div
                layout
                layoutId={id}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, { title, id, column })}
                className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
            >
                <p className="text-sm text-neutral-100">{title}</p>
                <p>{category}</p>
            </motion.div>
        </>
    );
};

const DropIndicator = ({ beforeId, column }) => {
    return (
        <div
            data-before={beforeId || "-1"}
            data-column={column}
            className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
        />
    );
};

const BurnBarrel = ({ setCards }) => {
    const [active, setActive] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDragEnd = (e) => {
        const cardId = e.dataTransfer.getData("cardId");

        setCards((pv) => pv.filter((c) => c.id !== cardId));

        setActive(false);
    };

    return (
        <div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
                active
                    ? "border-red-800 bg-red-800/20 text-red-500"
                    : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
            }`}
        >
            {active ? <FaFire className="animate-ping" /> : <FiTrash />}
        </div>
    );
};

const AddCard = ({ column, setCards, allCategories, cssFunc }) => {
    const [text, setText] = useState("");
    const [adding, setAdding] = useState(false);
    const [openCategorySelectionMenu, setOpenCategorySelectionMenu] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text.trim().length) return;

        const newCard = {
            column,
            title: text.trim(),

            id: Math.random().toString(),
            category: selectedCategory
        };

        setCards((pv) => [...pv, newCard]);

        setAdding(false);
    };

    return (
        <>
            {adding ? (
                <motion.form layout onSubmit={handleSubmit}>
          <textarea
              onChange={(e) => setText(e.target.value)}
              autoFocus
              placeholder="Add new task..."
              className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />

                    <div className='bg-white text-black w-fit' onClick={() => {setOpenCategorySelectionMenu(true)}}>{selectedCategory === '' ? 'Select a category' : selectedCategory + 'click to change'}</div>


                    {openCategorySelectionMenu && <div className='relative flex flex-wrap'>{allCategories.map(eachCat => <div className={`${cssFunc(eachCat.color)} w-fit`} onClick={() => setSelectedCategory(eachCat.name)}>{eachCat.name}</div>)}</div>}

                    <div className="mt-1.5 flex items-center justify-end gap-1.5">
                        <button
                            onClick={() => setAdding(false)}
                            className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
                        >
                            <span>Add</span>
                            <FiPlus />
                        </button>
                    </div>
                </motion.form>
            ) : (
                <motion.button
                    layout
                    onClick={() => setAdding(true)}
                    className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
                >
                    <span>Add card</span>
                    <FiPlus />
                </motion.button>
            )}
        </>
    );
};

const DEFAULT_CARDS = [
    // BACKLOG
    { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
    { title: "SOX compliance checklist", id: "2", column: "backlog" },
    { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
    { title: "Document Notifications service", id: "4", column: "backlog" },
    // TODO
    {
        title: "Research DB options for new microservice",
        id: "5",
        column: "todo",
    },
    { title: "Postmortem for outage", id: "6", column: "todo" },
    { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

    // DOING
    {
        title: "Refactor context providers to use Zustand",
        id: "8",
        column: "doing",
    },
    { title: "Add logging to daily CRON", id: "9", column: "doing" },
    // DONE
    {
        title: "Set up DD dashboards for Lambda listener",
        id: "10",
        column: "done",
    },
];