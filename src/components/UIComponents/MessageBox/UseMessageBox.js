import React,{useState} from 'react';
import MessageBox from './MessageBox';

const UseMessageBox = props => {
    const [Visible,setVisible]= useState(false);
    const showMessageBox = () => setVisible(true);

    const messagebox = Visible ? <MessageBox  /> : null;

    return [messagebox,showMessageBox];
   
};

export default UseMessageBox;