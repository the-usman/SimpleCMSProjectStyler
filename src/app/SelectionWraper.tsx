import { AppContext } from '@/context';
import React, { useRef, useState, useEffect, useContext } from 'react';
import { FaBold, FaItalic, FaLink, FaPaintBrush, FaFillDrip } from 'react-icons/fa';
import { Context } from './types';

const TextEditor = ({ children, id }: { children: React.ReactNode, id: string }) => {
    const textRef = useRef<HTMLDivElement | null>(null);
    const boldRef = useRef<HTMLButtonElement | null>(null);
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const italicRef = useRef<HTMLButtonElement | null>(null);
    const normalSizeRef = useRef<HTMLButtonElement | null>(null);
    const largeSizeRef = useRef<HTMLButtonElement | null>(null);
    const hugeSizeRef = useRef<HTMLButtonElement | null>(null);
    const smallSizeRef = useRef<HTMLButtonElement | null>(null);
    const [isActive, setIsActive] = useState(false);

    const context = useContext(AppContext);

    if (!context) {
        throw new Error('AppContext must be used within an AppProvider');
    }
    const { state } = context;

    const wrapSelectedText = (tagName: string, options?: { link?: string, color?: string, bgColor?: string, fontSize?: string }) => {
        const selection = window.getSelection();
        if (!selection?.rangeCount) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        if (selectedText) {
            const newNode = document.createElement(tagName);
            if (options?.link) {
                newNode.setAttribute('href', options.link);
                newNode.style.color = 'blue';
                newNode.style.textDecoration = 'underline';
                newNode.style.cursor = 'pointer';
                newNode.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.open(options.link, '_blank');
                });
            }
            if (options?.color) {
                newNode.style.color = options.color;
            }
            if (options?.bgColor) {
                newNode.style.backgroundColor = options.bgColor;
            }
            if (options?.fontSize) {
                newNode.style.fontSize = options.fontSize;
            }
            newNode.innerHTML = selectedText;

            range.deleteContents();
            range.insertNode(newNode);
        }
    };

    useEffect(() => {
        const handleSelectionChange = () => {
            const selection = window.getSelection();
            if (selection?.rangeCount) {
                const selectedElement = selection.anchorNode?.parentElement;
                if (selectedElement && textRef.current?.contains(selectedElement)) {
                    setIsActive(selection.toString().length > 0);
                } else {
                    setIsActive(false);
                }
            } else {
                setIsActive(false);
            }
        };

        document.addEventListener('selectionchange', handleSelectionChange);

        if (boldRef.current) {
            boldRef.current.addEventListener('click', () => {
                wrapSelectedText('strong');
            });
        }

        const AnchorClickHandler = () => {
            const url = prompt('Enter the URL:', 'https://share-hive.vercel.app');
            if (url) {
                wrapSelectedText('a', { link: url });
            }
        };

        if (anchorRef.current) {
            anchorRef.current.addEventListener('click', AnchorClickHandler);
        }

        if (italicRef.current) {
            italicRef.current.addEventListener('click', () => {
                wrapSelectedText('em');
            });
        }

        const handleNormalSize = () => {
            wrapSelectedText('span', { fontSize: '16px' });
        };

        const handleLargeSize = () => {
            wrapSelectedText('span', { fontSize: '20px' });
        };

        const handleHugeSize = () => {
            wrapSelectedText('span', { fontSize: '24px' });
        };

        const handleSmallSize = () => {
            wrapSelectedText('span', { fontSize: '12px' });
        };

        if (normalSizeRef.current) {
            normalSizeRef.current.addEventListener('click', handleNormalSize);
        }

        if (largeSizeRef.current) {
            largeSizeRef.current.addEventListener('click', handleLargeSize);
        }

        if (hugeSizeRef.current) {
            hugeSizeRef.current.addEventListener('click', handleHugeSize);
        }

        if (smallSizeRef.current) {
            smallSizeRef.current.addEventListener('click', handleSmallSize);
        }

        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
            anchorRef.current?.removeEventListener('click', AnchorClickHandler);
            normalSizeRef.current?.removeEventListener('click', handleNormalSize);
            largeSizeRef.current?.removeEventListener('click', handleLargeSize);
            hugeSizeRef.current?.removeEventListener('click', handleHugeSize);
            smallSizeRef.current?.removeEventListener('click', handleSmallSize);
        };
    }, []);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        wrapSelectedText('span', { color: e.target.value });
    };

    const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        wrapSelectedText('span', { bgColor: e.target.value });
    };

    return (
        <>
            <div className={`toolbar absolute -top-10 ${isActive ? 'flex' : 'hidden'} bg-white w-[300px] z-20 justify-between`}>
                <button ref={anchorRef} className={'p-4'}><FaLink /></button>
                <button ref={boldRef} className={'p-4'}><FaBold /></button>
                <button ref={italicRef} className={'p-4'}><FaItalic /></button>
                <div className="p-4 relative">
                    <FaPaintBrush />
                    <input type="color" className="absolute top-0 left-0 opacity-0 cursor-pointer w-full h-full" onChange={handleColorChange} />
                </div>
                <div className="p-4 relative">
                    <FaFillDrip />
                    <input type="color" className="absolute top-0 left-0 opacity-0 cursor-pointer w-full h-full" onChange={handleBgColorChange} />
                </div>
                <button ref={normalSizeRef} className={'p-4'}>Normal</button>
                <button ref={largeSizeRef} className={'p-4'}>Large</button>
                <button ref={hugeSizeRef} className={'p-4'}>Huge</button>
                <button ref={smallSizeRef} className={'p-4'}>Small</button>
            </div>
            <div
                ref={textRef}
            >
                {children}
            </div>
        </>
    );
};

export default TextEditor;
