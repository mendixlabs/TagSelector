import { useState, createElement, ReactElement, useEffect } from "react";

import "../ui/TagSelector.css";

import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'
import { ListValue, EditableValue, ActionValue, ListAttributeValue } from "mendix";
import { Styles } from 'react-select/src/styles';
import { OptionTypeBase } from "react-select/src/types";

const animatedComponents = makeAnimated();

export interface Option {
    label: string;
    value: string;
}

export interface Label {
    label: string;
    value: string;
}

enum Actions {
    Select = "select-option",
    Create = "create-option",
    Clear = "clear",
    Remove = "remove-value",
    Pop = "pop-value"
}

export interface TagSelectComponentProps {
    placeholder?: string;
    className?: string;
    classNamePrefix?: string;
    selectTag?: ActionValue;
    createTag?: ActionValue;
    toLowercase: boolean;
    removeTag?: ActionValue;
    removeAllTags?: ActionValue;
    tagLabel: EditableValue<string>;
    currentTags: ListValue;
    currentTagLabel: ListAttributeValue<string>;
    tagSuggestions: ListValue;
    tagSuggestionsLabel: ListAttributeValue<string>;
    useDefaultStyle: boolean;
    enableCreate: boolean;
    animatedDelete: boolean;
}

export default function TagSelector(props: TagSelectComponentProps): ReactElement {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<Option[]>([]);
    const [labels, setLabels] = useState<Label[]>([]);

    const createOption = (label: string) => ({
        label: props.toLowercase ? label.toLowerCase() : label,
        value: props.toLowercase ? label.toLowerCase().replace(/\W/g, '') : label.replace(/\W/g, ''),
    });
    useEffect(() => {
        if (props.currentTags.status === 'available') {
            const currentTags = props.currentTags.items.map(obj =>
                createOption(props.currentTagLabel(obj).displayValue));
            setLabels(currentTags);
        }
    }, [props.currentTags]);

    useEffect(() => {
        if (props.tagSuggestions.status === 'available') {
            const tagSuggestions = props.tagSuggestions.items.map(obj =>
                createOption(props.tagSuggestionsLabel(obj).displayValue));
            setOptions(tagSuggestions);
        }
    }, [props.tagSuggestions]);

    const handleChange = async (inputValue: any, actionMeta: any) => {
        switch (actionMeta.action) {
            case Actions.Select: {
                selectAction(inputValue);
                break;
            }
            case Actions.Create: {
                createAction(inputValue);
                break;
            }
            case Actions.Remove || Actions.Pop: {
                removeAction(actionMeta, inputValue);
                break;
            }
            case Actions.Clear: {
                clearAction();
                break;
            }
        }
    };

    let styles: Styles<OptionTypeBase, true> = {};

    if (!props.useDefaultStyle) {
        styles = {
            clearIndicator: () => ({}),
            container: () => ({}),
            control: () => ({}),
            dropdownIndicator: () => ({}),
            group: () => ({}),
            groupHeading: () => ({}),
            indicatorsContainer: () => ({}),
            indicatorSeparator: () => ({}),
            input: () => ({}),
            loadingIndicator: () => ({}),
            loadingMessage: () => ({}),
            menu: () => ({}),
            menuList: () => ({}),
            menuPortal: () => ({}),
            multiValue: () => ({}),
            multiValueLabel: () => ({}),
            multiValueRemove: () => ({}),
            noOptionsMessage: () => ({}),
            option: () => ({}),
            placeholder: () => ({}),
            singleValue: () => ({}),
            valueContainer: () => ({}),
        };
    }
    if (props.enableCreate) {
        return (
            <CreatableSelect
                isMulti
                options={options}
                value={labels}
                onChange={handleChange}
                isLoading={isLoading}
                components={props.animatedDelete ? animatedComponents : undefined}
                styles={styles}
                placeholder={props.placeholder}
                className={props.className!}
                classNamePrefix={props.classNamePrefix}
                tabSelectsValue={false}
            />
        );
    }
    else {
        return (
            <Select
                isMulti
                options={options}
                value={labels}
                onChange={handleChange}
                isLoading={isLoading}
                components={props.animatedDelete ? animatedComponents : undefined}
                styles={styles}
                placeholder={props.placeholder}
                className={props.className!}
                classNamePrefix={props.classNamePrefix}
                tabSelectsValue={false}
            />
        );
    }


    function clearAction() {
        setIsLoading(true);
        try {
            if (props.removeAllTags.canExecute) {
                props.removeAllTags.execute();
            }
            setLabels([]);
        } catch (err) {
            console.error('Failed to remove all Tags: ' + err);
        }
        setIsLoading(false);
    }

    function removeAction(actionMeta: any, inputValue: any) {
        setIsLoading(true);
        try {
            if (props.tagLabel.status === 'available') {
                props.tagLabel.setValue(actionMeta.removedValue.label);
            }
            if (props.removeTag.canExecute) {
                props.removeTag.execute();
            }
            setLabels(inputValue);
        } catch (err) {
            console.error('Failed to remove a Tag: ' + err);
        }
        setIsLoading(false);
    }

    function createAction(inputValue: any) {
        setIsLoading(true);
        inputValue[inputValue.length - 1].label = props.toLowercase ?
            inputValue[inputValue.length - 1].label.toLowerCase() :
            inputValue[inputValue.length - 1].label;
        try {
            if (props.tagLabel.status === 'available') {
                props.tagLabel.setValue(inputValue[inputValue.length - 1].label);
            }
            if (props.createTag.canExecute) {
                props.createTag.execute();
            }
            setLabels(inputValue);
        } catch (err) {
            console.error('Failed to create a Tag: ' + err);
        }
        setIsLoading(false);
    }

    function selectAction(inputValue: any) {
        setIsLoading(true);
        inputValue[inputValue.length - 1].label = props.toLowercase ?
            inputValue[inputValue.length - 1].label.toLowerCase() :
            inputValue[inputValue.length - 1].label;
        try {
            if (props.tagLabel.status === 'available') {
                props.tagLabel.setValue(inputValue[inputValue.length - 1].label);
            }
            if (props.selectTag.canExecute) {
                props.selectTag.execute();
            }
            setLabels(inputValue);
        } catch (err) {
            console.error('Failed to select a Tag: ' + err);
        }
        setIsLoading(false);
    }
}