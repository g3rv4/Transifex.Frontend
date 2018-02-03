import * as React from "react";
import { Fragment } from "react";

export interface BooleanFieldProps {
    onUpdate: (value?: boolean) => void;
    value: boolean;
    title: string;
}

export default class BooleanField extends React.Component<BooleanFieldProps, {}> {
    constructor(props: BooleanFieldProps) {
        super(props);
    }

    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let value : boolean = null;
        switch(event.currentTarget.value){
            case '0':
                value = false;
                break;
            case '1':
                value = true;
                break;
        }
        this.props.onUpdate(value);
    }

    render() {
        return <div>
                <span>{this.props.title}</span>:
                <select onChange={this.handleChange}>
                    <option value=""></option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
            </div>
    }
}
