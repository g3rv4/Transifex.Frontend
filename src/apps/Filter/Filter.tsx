import * as React from "react";
import { Fragment } from "react";
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import * as _ from 'lodash';
import nameofFactory from './../../helpers/nameof'

import RegexField from "./Components/RegexField";
import BooleanField from "./Components/BooleanField";
import MultipleStringsField from "./Components/MultipleStringsField";
import Results, { TransifexString } from "./Components/Results"

export interface FilterState {
    currentRequest: TransifexRequest;
    results: TransifexString[];
}

class TransifexRequest {
    stringRegex?: string;
    translationRegex?: string;
    isReviewed?: boolean;
    withNonReviewedSuggestions?: boolean;
    onlyTranslationsFromUsers?: string[];
    onlySuggestionsFromUsers?: string[];
}

const nameof = nameofFactory<TransifexRequest>();
export default class Filter extends React.Component<{}, FilterState> {
    constructor(props: {}) {
        super(props);
        
        this.state = {
            currentRequest: {
                onlySuggestionsFromUsers: [],
                onlyTranslationsFromUsers: []
            },
            results: []
        };
    }

    handleField = (fieldName: string) => (value: string | boolean | string[]) : void => {
        this.setState({
            currentRequest: {
                ...this.state.currentRequest,
                [fieldName]: value
            }
        });
        event.preventDefault();
        this.handleSubmit(null);
    }

    handleSubmit = _.debounce((e: React.FormEvent<any>) => {
        const _that = this;
        axios.post<TransifexString[]>('/api/home/query', this.state.currentRequest)
          .then(function (response) {
            _that.setState({results: response.data});
          })
          .catch(function (error) {
            console.log(error);
          });
        e && e.preventDefault();
    }, 1000);

    render() {
        return <form onSubmit={this.handleSubmit}>
            <RegexField 
                onUpdate={this.handleField(nameof('stringRegex'))}
                value={this.state.currentRequest.stringRegex || ""}
                title="original string"
            />
            <RegexField 
                onUpdate={this.handleField(nameof('translationRegex'))}
                value={this.state.currentRequest.translationRegex || ""}
                title="translated string"
            />
            <BooleanField
                onUpdate={this.handleField(nameof('isReviewed'))}
                title="Reviewed"
                value={this.state.currentRequest.isReviewed}
            />
            <BooleanField
                onUpdate={this.handleField(nameof('withNonReviewedSuggestions'))}
                title="Witn non reviewed suggestions"
                value={this.state.currentRequest.withNonReviewedSuggestions}
            />
            <MultipleStringsField
                onUpdate={this.handleField(nameof('onlyTranslationsFromUsers'))}
                title='Only include translations made by the following users'
                value={this.state.currentRequest.onlyTranslationsFromUsers}
            />
            <MultipleStringsField
                onUpdate={this.handleField(nameof('onlySuggestionsFromUsers'))}
                title='Only include suggestions made by the following users'
                value={this.state.currentRequest.onlyTranslationsFromUsers}
            />
            <input type="submit"/>
            <Results
                results={this.state.results}
                showSuggestion={this.state.currentRequest.withNonReviewedSuggestions || 
                                this.state.currentRequest.onlySuggestionsFromUsers.length > 0}
            />
        </form>
    }
}
