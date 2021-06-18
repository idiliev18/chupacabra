import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            stack: null,
        };
    }

    componentDidCatch(error, stack) {
        this.setState({
            error,
            stack,
        });
    }

    render() {
        if (this.state.error) {
            return (
                <div className="center">
                    <div style={{ textAlign: "center" }} className="content">
                        <h1 style={{ fontSize: "12vh" }}>OoPs!</h1>
                        <h1 style={{ fontSize: "6vh" }}>
                            Something went wrong
                        </h1>
                        <br />
                        <br />
                        <code>{this.state.error.toString()}</code>
                        {/* <code>{this.state.stack.componentStack}</code> */}
                    </div>
                </div>
            );
        } else {
            return this.props.children;
        }
    }
}
