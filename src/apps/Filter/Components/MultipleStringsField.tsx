import * as React from "react";
import { Fragment } from "react";
import * as _ from 'lodash';

export interface MultipleStringsFieldProps {
    onUpdate: (value?: string[]) => void;
    value: string[];
    title: string;
}

export default class MultipleStringsField extends React.Component<MultipleStringsFieldProps, {}> {
    constructor(props: MultipleStringsFieldProps) {
        super(props);
    }

    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let values = event.currentTarget.value.split('\n');
        values = _.map(values, v=>v.trim());
        values = _.filter(values);

        this.props.onUpdate(values);
    }

    render() {
        return <div>
                <span>{this.props.title}</span>:
                <textarea
                    onChange={this.handleChange}
                >
                </textarea>
            </div>
    }
}
