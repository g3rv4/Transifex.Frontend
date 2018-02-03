import * as React from "react";
import { Fragment } from "react";

export interface Translation {
    lastUpdate: string;
    string: string;
    user: string;
}

export interface Suggestion {
    username: string;
    lastUpdate: string;
    suggestion: string;
}

export interface TransifexString {
    id: number;
    string: string;
    reviewed: boolean;
    translation?: Translation;
    suggestions: Suggestion[];
    comment: string;
    stringHash: string;
    key: string;
}

export interface ResultsProps {
    results: TransifexString[];
    showSuggestion: boolean;
}

export default class Results extends React.Component<ResultsProps, {}> {
    constructor(props: ResultsProps) {
        super(props);
    }

    render() {
        return <table>
            <thead>
                <tr>
                    <th>String</th>
                    <th>Translation</th>
                    {this.props.showSuggestion && <>
                        <th>Suggestion</th>
                        </>}
                    <th>Comment</th>
                </tr>
            </thead>
            <tbody>
                {this.props.results.map((result, index) =>
                    <tr key={result.id}>
                        <td><a href={`https://www.transifex.com/stack-exchange/stack-overflow-es/translate/#es/english/${result.id}?key=${result.key.split('|')[0]}`} target="_blank">{result.string}</a></td>
                        <td>{result.translation && result.translation.string}</td>
                        {this.props.showSuggestion && <>
                            <td>{result.suggestions.length > 0 && result.suggestions[0].suggestion}</td>
                            </>}
                        <td>{result.comment}</td>
                    </tr>)}
            </tbody>
        </table>
    }
}
