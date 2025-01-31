import React, {useEffect, useState} from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "motion/react";
import { FaFire } from "react-icons/fa";

export const TomsKanban = () => {
    return (
        <div className="h-screen w-full bg-neutral-900 text-neutral-50">
            <Board />
        </div>
    );
};

const Board = () => {
    const [cards, setCards] = useState([]);
    const [columns, setColumns] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [currentModalValue, setCurrentModalValue] = useState('')
    const [allCategories, setAllCategories] = useState([])
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)
    const [currentCategoryValue, setCurrentCategoryValue] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [setFilter, setSetFilter] = useState('')
    const [filteredCards, setFilteredCards] = useState([])

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

    function handleCategoryAddition(newCat){
        setAllCategories(prev => [...prev, newCat])
    }

    return (<div>
            <div onClick={() => setOpenModal(true)}
                 className={` bg-black w-fit py-3 px-3 rounded-lg hover:cursor-pointer font-medium ml-4 hover:bg-opacity-90 duration-200`}>Add
                Column
            </div>
            <div onClick={() => setCategoryModalOpen(true)}
                 className={` bg-black w-fit py-3 px-3 rounded-lg hover:cursor-pointer font-medium ml-4 hover:bg-opacity-90 duration-200`}> Add/Manage
                Categories
            </div>


            <div
                 className={` bg-black w-fit py-3 px-3 rounded-lg hover:cursor-pointer font-medium ml-4 hover:bg-opacity-90 duration-200`} onClick={() => setShowFilters(prev => !prev)}> Filter by category



            {showFilters && <div className='text-white'>
                {allCategories.map(each => <div onClick={() => handleSettingFilter(each)}>{each}</div>)}
            </div>}

            </div>

        {setFilter !== '' &&  <div onClick={() => {
                setSetFilter('')
                setFilteredCards(cards)
            }} className='bg-red-600 w-fit px-5 py-1 rounded-md hover:cursor-pointer'>Cancel Filtering</div>}


            {categoryModalOpen &&
                <div className='bg-black px-4  w-fit absolute left-4 top-20 rounded-b-xl rounded-tr-xl pb-4'>
                    <input autoFocus className='bg-black  mt-4 py-2 px-4 rounded-md
       ' type="text" placeholder='Add new category name here' value={currentCategoryValue}
                           onChange={(e) => setCurrentCategoryValue(e.target.value)}/>

                    <div className='flex'>
                        <div onClick={() => handleCategoryAddition(currentCategoryValue)}
                             className='bg-black  mt-3 px-2 py-1.5 w-fit rounded-lg hover:bg-opacity-10 hover:cursor-pointer mx-auto hover:border-white border border-black border-opacity-5'>Add
                            Category
                        </div>
                        <div onClick={() => setCategoryModalOpen(false)}
                             className='bg-black  mt-3 px-2 py-1.5 w-fit rounded-lg hover:bg-opacity-10 hover:cursor-pointer mx-auto hover:border-white border border-black border-opacity-5'>Cancel
                        </div>
                    </div>

                    {allCategories.map(eachCat => <div>{eachCat}</div>)}


                </div>}


            {openModal &&
                <div className='bg-black px-4  w-fit absolute left-4 top-20 rounded-b-xl rounded-tr-xl pb-4'>
                    <input autoFocus className='bg-black  mt-4 py-2 px-4 rounded-md
       ' type="text" placeholder='Add your modal name here' value={currentModalValue}
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

            <div className="flex h-full w-full gap-3 overflow-scroll p-12">

                {columns.map(eachCol => <Column title={eachCol} column={eachCol.toLowerCase()} cards={ setFilter === '' ? cards : filteredCards}
                                                setCards={setCards} allCats={allCategories}/>)}
                <BurnBarrel setCards={setCards}/>
            </div>
        </div>
    );
};

const Column = ({title, cards, column, setCards, allCats}) => {
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
                <AddCard column={column} setCards={setCards} allCategories={ allCats} />
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

const AddCard = ({ column, setCards, allCategories }) => {
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
                    {openCategorySelectionMenu && <div className='relative'>{allCategories.map(eachCat => <div onClick={() => setSelectedCategory(eachCat)}>{eachCat}</div>)}</div>}
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