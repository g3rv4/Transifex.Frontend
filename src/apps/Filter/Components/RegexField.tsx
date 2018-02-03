import * as React from "react";
import { Fragment } from "react";

export interface RegexFieldProps {
    onUpdate: (s?: string) => void;
    value: string;
    title: string;
}

export default class RegexField extends React.Component<RegexFieldProps, {}> {
    constructor(props: RegexFieldProps) {
        super(props);
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => this.props.onUpdate(event.currentTarget.value);

    render() {
        return <div>
                <span>{this.props.title}</span>:
                <input 
                    type="text"
                    value={this.props.value}
                    onChange={this.handleChange}
                />
            </div>
    }
}
