import React from 'react';
import '../styles/toolbar.scss'
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import Rect from "../tools/Rect";
import Line from "../tools/Line";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";

const Toolbar = () => {

    const changeColor = e => {
        toolState.setStrokeColor(e.target.value)
        toolState.setFillColor(e.target.value)
    }

    const undoHandler = (socket, id) => {
        canvasState.undo()
        console.log(socket, id);
        socket.send(JSON.stringify({
            method: 'undo',
            id: id
        }))
    }

    const redoHandler = (socket, id) => {
        canvasState.redo()
        console.log(socket, id);
        socket.send(JSON.stringify({
            method: 'redo',
            id: id
        }))
    }

    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL()
        console.log(dataUrl)
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = canvasState.sessionid + ".jpg"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <div className="toolbar">
            <button className="toolbar__btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid))}/>
            <button className="toolbar__btn rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid))}/>
            <button className="toolbar__btn circle" onClick={() => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionid))}/>
            <button className="toolbar__btn eraser" onClick={() => toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionid))}/>
            <button className="toolbar__btn line" onClick={() => toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionid))}/>
            <input onChange={e => changeColor(e)} style={{marginLeft:10}} type="color"/>
            <button className="toolbar__btn undo" onClick={() => undoHandler(canvasState.socket, canvasState.sessionid)}/>
            <button className="toolbar__btn redo" onClick={() => redoHandler(canvasState.socket, canvasState.sessionid)}/>
            <button className="toolbar__btn save" onClick={() => download()}/>
        </div>
    );
};

export default Toolbar;
