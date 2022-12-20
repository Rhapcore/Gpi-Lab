import React, { useRef } from "react";
// import  {Component } from "react";
import ReactToPrint from 'react-to-print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

// imagen
import InformeEjemplo from '../Imagenes/InformeEjemplo.png';
import Image from "mui-image";

const DocuPDF = () => {

    const componentRef = useRef();
/*
    class App extends Component{
        constructor (props) {
            super (props);
            this.state = {
                fileName: "",
                fileContent: ""
            };
        }
    handleFileChange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            this.setState ({fileName: file.name, fileContent: reader.result})
        }
        reader.onerror = () => {
            console.log("No Coresponde", reader.error)
        }
    }
};
*/
    
    return (
        <>
            <ReactToPrint
                trigger={() => (<PictureAsPdfIcon/>
                )}
                content={() => componentRef.current}
                severity="success"
            />
            <div style={{ display: 'none' }}>
                <div  ref={componentRef}>
                        <table className="testClass">
                        <thead>
                            <tr className="column2">
                                <tr>ㅤㅤㅤ</tr>
                                <i>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</i>
                                <h1> Ejemplo </h1>
                                <Image duration={1000} height="80%" width="100%" src={InformeEjemplo}/>
                                <h1> Ejemplo </h1>
                                <i>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</i>
                                <tr>ㅤㅤㅤ</tr>
                                <tr></tr>
                            </tr>
                        </thead>
                        </table>
                </div>
            </div>
        </>
    );
};

export default DocuPDF;

