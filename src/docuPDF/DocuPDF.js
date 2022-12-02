import React, { useRef, Component } from "react";
import ReactToPrint from 'react-to-print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

// imagen
import LogoGpi from '../Imagenes/Logo-GPI.png';
import "../Imagenes/Header.css";

const DocuPDF = () => {

    const componentRef = useRef();

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
                                <img src={ LogoGpi } className="imagenLogo300"/>
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

