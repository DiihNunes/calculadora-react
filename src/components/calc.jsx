import React from "react";
import { useState } from "react";

import "./calc.css";

export default (props) => {
    const [Calc, setCalc] = useState("");
    const [result, setResult] = useState("");

    // atualiza o display da calculadora e
    // evita de adicionar dois sinais de operação
    const ops = ["/", "*", "-", "+", "."];

    const atualizarCalc = (value) => {
        if (ops.includes(value) && Calc === "" ||
            ops.includes(value) && ops.includes(Calc.slice(-1))) {
            return
        }
        setCalc(Calc + value);

        if (!ops.includes(value)) {
            setResult(eval(Calc + value).toString());
        }
    }

    // cria os digitos de 1 a 9
    const criarDigitos = () => {
        const digitos = [];

        for (let i = 1; i < 10; i++) {
            digitos.push(
                <button key={i}
                    onClick={() => atualizarCalc(i.toString())}>{i}</button>
            )
        }

        return digitos;
    }

    //printa o resultado em forma de string na tela
    const calcular = () => {
        setCalc(eval(Calc).toString());
    }

    //apaga o ultimo digito do display
    // se o display estiver zerado, ele apaga o resultado da ultima conta
    const apagar = () => {
        if (Calc == '') {
            setResult('0');
            return
        }

        const value = Calc.slice(0, -1);

        setCalc(value);
    }

    return (
        <div className="calculadora">
            <div className="display">
                {result ? <span>({result})</span> : ""}&nbsp;
                {Calc || "0"}
            </div>

            <div className="operadores">
                <button onClick={() => atualizarCalc("/")}>÷</button>
                <button onClick={() => atualizarCalc("*")}>x</button>
                <button onClick={() => atualizarCalc("-")}>-</button>
                <button onClick={() => atualizarCalc("+")}>+</button>

                <button onClick={apagar}>DEL</button>
            </div>

            <div className="digitos">
                {criarDigitos()}
                <button onClick={() => atualizarCalc("0")}>0</button>
                <button onClick={() => atualizarCalc(".")}>.</button>

                <button onClick={calcular}>=</button>
            </div>
        </div>
    )
}