import React from "react";
import { Box } from "react-bulma-components";
import styles from "./SetupForm.module.scss";

function SetupForm(props) {
    const handleSubmit = props.onSubmit;

    return (
        <Box style={props.style} className={styles.box}>
            <div
                className={"is-flex " + styles["responsive-flex"]}
                style={{ height: "100%" }}
            >
                <div id={styles["side-msg"]} className={styles["flex-item"]}>
                    <h1>Добре дошли в Chupacabra</h1>
                </div>
                <form
                    className={styles["flex-item"]}
                    id={styles["form"]}
                    onSubmit={
                        handleSubmit
                            ? handleSubmit
                            : (e) => {
                                  e.preventDefault();
                              }
                    }
                >
                    {props.children}
                </form>
            </div>
        </Box>
    );
}

export { SetupForm };
