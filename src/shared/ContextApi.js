import React, { createContext, useContext } from 'react'

export const myContext = createContext();

export const useMyContext = () => {
    return useContext(myContext)
}


export const Context = (props) => {
    const [imgAddress, setImgAddress] = React.useState();
    const [timerMessage, setTimerMessage] = React.useState(false)
    const [btnOpen, setBtnOpen] = React.useState(false);
    const btnClickOff = () => setBtnOpen(false);
    const btnClickOn = () => setBtnOpen(!btnOpen);

    const [tabNum, setTabNum] = React.useState(0);
    const [categoryNum, setCategoryNum] = React.useState(1);

    const [isOpenProfileImg, setIsOpenProfileImg] = React.useState(false)  


    const value = {
        imgAddress,
        setImgAddress,
        timerMessage,
        setTimerMessage,
        btnOpen,
        btnClickOff,
        btnClickOn,
        isOpenProfileImg,
        setIsOpenProfileImg,

        //탭넘버
        tabNum,
        setTabNum,

        //카테고리넘버
        categoryNum,
        setCategoryNum
    };

    return (
        <myContext.Provider value={value} >
            {props.children}
        </myContext.Provider >
    )
};