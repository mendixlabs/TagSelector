import { createElement, ReactElement, useState } from "react";
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
interface State {
    readonly menuIsOpen?: boolean;
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
    const [value, setValue] = useState<any | null>(null)
    const [inputValue, setInputValue] = useState<any | null>(null);

    const createOption = (label: string): Option => ({
        label: label ,
        value: label !== null ? label.replace(/\W/g, '') : null,
    });

    let labels: Option[];
    let tagSuggestions: Option[];

    if (props.currentTags.status === ValueStatus.Available) {
        labels = props.currentTags.items.map(obj => {
            //Accessing an attribute from the list item directly is deprecated since mx9, but the get() function doesn't yet exist yet in mx8. Thats why we have this check, to have the widget work in both versions.
            const currentTagValue = "get" in props.currentTagLabel ? props.currentTagLabel.get(obj).displayValue : props.currentTagLabel(obj).displayValue;
            return createOption(currentTagValue);
        });
    }

    if (props.tagSuggestions.status === ValueStatus.Available) {
        tagSuggestions = props.tagSuggestions.items.map(obj =>{
            const tagSuggestionValue = "get" in props.currentTagLabel ? props.tagSuggestionsLabel.get(obj).displayValue : props.tagSuggestionsLabel(obj).displayValue;
            return createOption(tagSuggestionValue);
        });
    }

    const onInputChange = async (textInput,  actionMeta: any ) => {
        console.log("on input change triggered...",actionMeta.action)
        if (actionMeta.action === "input-change") {
          if (textInput && (textInput.endsWith(",") || textInput.endsWith(" "))){
            const label = textInput.slice(0, -1); // trim off comma
            if(label){
                const newValue = { label, value: label };
                console.log("comma separator",actionMeta.action)
 
                if (props.tagLabel.status === ValueStatus.Available) {
                props.tagLabel.setValue(label);
                }
                if (props.createTag.canExecute) {
                props.createTag.execute();
                }
            }
            console.log('creat action...',actionMeta,inputValue)
            setInputValue("");
          } 
          else {
            setInputValue(textInput);
          }
        }
      };

    const handleChange = async (inputValue: any, actionMeta: any) => {
        console.log('handle change triggered ......')
        setInputValue(""); setInputValue("");
        switch (actionMeta.action) {
            case Actions.Select: {
                selectAction(actionMeta);
                console.log('select action...',actionMeta,inputValue)
                break;
            }
            case Actions.Create: {
                createAction(actionMeta);
                console.log('creat action...',actionMeta,inputValue)
                break;
            }
            case Actions.Remove:
            case Actions.Pop: {
                removeAction(actionMeta);
                console.log('remove/pop action...',actionMeta,inputValue)
                break;
            }
            case Actions.Clear: {
                clearAction();
                console.log('clear action...',actionMeta,inputValue)
                break;
            }
        }
    };

    function customCreateNewTag(input: String) {
        return React.createElement('span', { id: 'custom-create-tag-label' }, props.customCreatePrefix + ' "' + input + '"');
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
        console.log('banani is  trying 1234567891234567891234... ')
        return (
            <CreatableSelect
                isMulti
                options={tagSuggestions}
                value={labels}
                onInputChange={onInputChange}
                onChange={handleChange}
                inputValue={inputValue}
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
        console.log('banani is trying ')
        return (
            <Select
                isMulti
                options={tagSuggestions}
                value={labels}
                onInputChange={onInputChange}
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
