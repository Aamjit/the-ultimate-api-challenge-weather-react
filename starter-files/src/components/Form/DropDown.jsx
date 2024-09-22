import React, { useState } from 'react';

function DropDown({ label, list, handleSelected, keyField }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const handleSelect = e => {
        e.preventDefault();
        setMenuVisible(!menuVisible);
    };

    return (
        <div>
            <label>{label}</label>
            <div className="relative">
                <div className="w-full inline-flex items-center overflow-hidden rounded-md border bg-white">
                    <span
                        onClick={handleSelect}
                        className="border-e flex-auto px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                    >
                        {selectedText ? selectedText : 'Select'}
                    </span>

                    <button
                        onClick={handleSelect}
                        className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                    >
                        <span className="sr-only">Menu</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                <div
                    className={`${
                        menuVisible ? '' : 'd-none'
                    } absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg scroll-m-0 max-h-80 overflow-scroll`}
                    role="menu"
                >
                    <div className="p-2">
                        {list?.length != 0 &&
                            list.map((item, index) => (
                                <button
                                    key={item[keyField]}
                                    className="block w-full text-left rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                    role="menuitem"
                                    onClick={e => {
                                        handleSelect(e);
                                        setSelectedText(() => {
                                            return item?.AdministrativeArea
                                                ? `${item.EnglishName}, ${item?.AdministrativeArea.EnglishName}`
                                                : item.EnglishName;
                                        });
                                        handleSelected(item);
                                    }}
                                >
                                    {item?.EnglishName}
                                    {item?.AdministrativeArea ? `, ${item?.AdministrativeArea.EnglishName}` : ''}
                                </button>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DropDown;
