import { createElement, ReactElement } from "react";
import React from "react";

import "../ui/TagSelector.css";

import makeAnimated from 'react-select/animated';
import AsyncCreatableSelect from 'react-select/async-creatable';
import Select from 'react-select'
import { ListValue, EditableValue, ActionValue, ListAttributeValue, ValueStatus } from "mendix";
import { Styles } from 'react-select/src/styles';
import { OptionTypeBase } from "react-select/src/types";

const animatedComponents = makeAnimated();

export interface Option {
    label: string;
    value: string;
}

export type ActionResponse =
    | string
    | number
    | boolean
    | mendix.lib.MxObject
    | mendix.lib.MxObject[];

export interface User{
    EmailAddress: string
}

export interface MxDataActionParams {
    actionname: string;

    applyto?: string | undefined;
    guids?: string[] | undefined;
    xpath?: string | undefined;
    constraints?: string | undefined;
    sort?: [string, 'desc' | 'asc'][] | undefined;
    gridid?: string | undefined;
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
    datasourceMicroflow: EditableValue<string>; 
    guid: EditableValue<string>,
    inputValue: EditableValue<string>;
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

//helper function to call microflow using the Client API. Needs to be removed when we use the reload function instead only
//available when we upgrade to mendix 9
const action = async (params: MxDataActionParams) => {
    return new Promise<Option[]>((resolve, reject) => {
        window.mx.data.action({
            params,
            callback: response => {
                let outcome: User[] | ActionResponse = response;
                if (response instanceof Array && response.length) {
                    outcome = (response.map(mxObj => {
                        return mxObj.getAttributes().reduce(
                            (obj, attr: string) => ({
                                ...obj,
                                [attr]: mxObj.get(attr),
                            }),
                            {}
                        );
                    }) as unknown) as User[];
                }
                const options = (outcome as User[]).map(obj =>  {
                    return { 
                    label: obj.EmailAddress,
                    value: obj.EmailAddress
                    }
                })
                resolve(options);
            },
            error: reject,
        });
    });
}

//only calls the microflow if the input doesn't match in the current available TagSuggestions.
//Ideally has a debounce effect on this function, but this led to the widget to be stuck and not re rendering
//for unknown reason.
    const callDataSource = (inputValue: string): Promise<Option[]> => {
        let guids = [props.guid.value];
        props.inputValue.setValue(inputValue);
        if(!tagSuggestions.some(option => option.value.includes(inputValue))){
        const a = action({actionname: props.datasourceMicroflow.displayValue, applyto: "selection",
         guids: guids
        });
        return a;
        }else{
            return new Promise<Option[]>((resolve) => {
               const matching = tagSuggestions.filter(option => option.value.includes(inputValue));
               matching.map(obj =>  {
                return { 
                label: obj.label,
                value: obj.value
                }
            })
            resolve(matching);
            }) 
        }
     }

    const loadOptions = (inputValue: string) =>{
        return callDataSource(inputValue);
 }

 console.log(JSON.stringify(tagSuggestions)); 

    if (props.currentTags.status === ValueStatus.Available) {
        labels = props.currentTags.items.map(obj => {
            //Accessing an attribute from the list item directly is deprecated since mx9, but the get() function doesn't yet exist yet in mx8. Thats why we have this check, to have the widget work in both versions.
            const currentTagValue = props.currentTagLabel(obj).displayValue;
            return createOption(currentTagValue);
        });
    }

    if (props.tagSuggestions.status === ValueStatus.Available) {
        tagSuggestions = props.tagSuggestions.items.map(obj =>{
            const tagSuggestionValue = props.tagSuggestionsLabel(obj).displayValue;
            return createOption(tagSuggestionValue);
        });
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
        return (
            <AsyncCreatableSelect
            isMulti
            defaultOptions={tagSuggestions}
            loadOptions={loadOptions}
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
            props.inputValue.setValue(''); 

        }
        if (props.removeTag.canExecute) {
            props.removeTag.execute();
        }
    }

    function createAction(actionMeta: any) {
        if (props.tagLabel.status === ValueStatus.Available) {
            props.tagLabel.setValue(actionMeta.option.label);
            props.inputValue.setValue(''); 
        }
        if (props.createTag.canExecute) {
            props.createTag.execute();
        }
    }

    function selectAction(actionMeta: any) {
        if (props.tagLabel.status === ValueStatus.Available) {
            props.tagLabel.setValue(actionMeta.option.label);
            props.inputValue.setValue(''); 
        }
        if (props.selectTag.canExecute) {
            props.selectTag.execute();
        }
    }
}