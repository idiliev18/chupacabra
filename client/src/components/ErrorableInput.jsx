import React from "react";

function ErrorableInput(props) {
    return (
        <>
            <label className="label">{props.label}</label>
            <input
                type={!!props.type ? props.type : "text"}
                name={props.name}
                className={`input ${!!props.errText ? "is-danger" : null}`}
                placeholder={props.placeholder}
                {...{ required: props.required }}
            />
            {!!props.errText ? (
                <div className="help is-danger">{props.errText}</div>
            ) : null}
        </>
    );
}

export { ErrorableInput };
