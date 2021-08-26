import { createElement, ReactElement } from "react";
import React from "react";

import "../ui/TagSelector.css";

import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'
import { ListValue, EditableValue, ActionValue, ListAttributeValue, ValueStatus } from "mendix";
import { Styles } from 'react-select/src/styles';
import { OptionTypeBase } from "react-select/src/types";

const animatedComponents = makeAnimated();

export interface Option {
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
    disabled: boolean;
    customCreatePrefix?: string;
}

export default function TagSelector(props: TagSelectComponentProps): ReactElement {
    const createOption = (label: string): Option => ({
        label: label,
        value: label.replace(/\W/g, ''),
    });

    let labels: Option[];
    let tagSuggestions: Option[];

    if (props.currentTags.status === ValueStatus.Available) {
        labels = props.currentTags.items.map(obj =>
            createOption(props.currentTagLabel(obj).displayValue));
    }

    if (props.tagSuggestions.status === ValueStatus.Available) {
        tagSuggestions = props.tagSuggestions.items.map(obj =>
            createOption(props.tagSuggestionsLabel(obj).displayValue));
    }


    const handleChange = async (inputValue: any, actionMeta: any) => {
        switch (actionMeta.action) {
            case Actions.Select: {
                selectAction(actionMeta);
                break;
            }
            case Actions.Create: {
                createAction(actionMeta);
                break;
            }
            case Actions.Remove:
            case Actions.Pop: {
                removeAction(actionMeta);
                break;
            }
            case Actions.Clear: {
                clearAction();
                break;
            }
        }
    };

    function customCreateNewTag (input : String){
        return React.createElement('span', {id:'custom-create-tag-label'}, props.customCreatePrefix+ ' "' + input + '"');
    }

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

    const isLoading =
        props.tagSuggestions.status === ValueStatus.Loading ||
        (props.currentTags && props.currentTags.status === ValueStatus.Loading);

    if (props.enableCreate) {
        return (
            <CreatableSelect
                isMulti
                options={tagSuggestions}
                value={labels}
                onChange={handleChange}
                isLoading={isLoading}
                components={props.animatedDelete ? animatedComponents : undefined}
                styles={styles}
                placeholder={props.placeholder}
                className={props.className!}
                classNamePrefix={props.classNamePrefix}
                tabSelectsValue={false}
                isDisabled={props.disabled}
                formatCreateLabel={customCreateNewTag}
            />
        );
    }
    else {
        return (
            <Select
                isMulti
                options={tagSuggestions}
                value={labels}
                onChange={handleChange}
                isLoading={isLoading}
                components={props.animatedDelete ? animatedComponents : undefined}
                styles={styles}
                placeholder={props.placeholder}
                className={props.className!}
                classNamePrefix={props.classNamePrefix}
                tabSelectsValue={false}
                isDisabled={props.disabled}
            />
        );
    }


    function clearAction() {
        if (props.removeAllTags.canExecute) {
            props.removeAllTags.execute();
        }
    }

    function removeAction(actionMeta: any) {
        if (props.tagLabel.status === ValueStatus.Available) {
            props.tagLabel.setValue(actionMeta.removedValue.label);
        }
        if (props.removeTag.canExecute) {
            props.removeTag.execute();
        }
    }

    function createAction(actionMeta: any) {
        if (props.tagLabel.status === ValueStatus.Available) {
            props.tagLabel.setValue(actionMeta.option.label);
        }
        if (props.createTag.canExecute) {
            props.createTag.execute();
        }
    }

    function selectAction(actionMeta: any) {
        if (props.tagLabel.status === ValueStatus.Available) {
            props.tagLabel.setValue(actionMeta.option.label);
        }
        if (props.selectTag.canExecute) {
            props.selectTag.execute();
        }
    }
}