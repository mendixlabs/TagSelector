import { useState, createElement, ReactElement, useEffect } from "react";

import "../ui/TagSelector.css";

import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'
import { ListValue, EditableValue, ActionValue, ListAttributeValue } from "mendix";
import { Styles } from 'react-select/src/styles';
import { OptionTypeBase } from "react-select/src/types";

const createOption = (label: string) => ({
    label: label.toLowerCase(),
    value: label.toLowerCase().replace(/\W/g, ''),
  });

const animatedComponents = makeAnimated();

export interface Option {
    label: string;
    value: string;
  }
  
  export interface Label {
    label: string;
    value: string;
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
}

export default function TagSelector(props: TagSelectComponentProps): ReactElement{
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);

  useEffect(() => {
    if(props.currentTags.status === 'available'){
      const currentTags = props.currentTags.items.map(obj =>
        createOption(props.currentTagLabel(obj).displayValue));
      setLabels(currentTags);
    }
  }, [props.currentTags]);

  useEffect(() => {
    if(props.tagSuggestions.status === 'available'){
      const tagSuggestions = props.tagSuggestions.items.map(obj =>
        createOption(props.tagSuggestionsLabel(obj).displayValue));
      setOptions(tagSuggestions);
    }
  }, [props.tagSuggestions]);

  const handleChange = async (inputValue: any, actionMeta: any) => {
    if (
        actionMeta.action === 'select-option'
    ) {
      setIsLoading(true);
      inputValue[inputValue.length - 1].label = inputValue[
        inputValue.length - 1
      ].label.toLowerCase();
      try {
        if(props.tagLabel.status==='available'){
          props.tagLabel.setValue(inputValue[inputValue.length - 1].label);
        }
        if(props.selectTag.canExecute){
          props.selectTag.execute();
        }
        setLabels(inputValue);
      } catch (err) {
        console.error('Failed to select a Tag: ' + err);
      }
      setIsLoading(false);
    }
    if (
      actionMeta.action === 'create-option'
    ) {
      setIsLoading(true);
      inputValue[inputValue.length - 1].label = inputValue[
        inputValue.length - 1
      ].label.toLowerCase();
      try {
        if(props.tagLabel.status==='available'){
          props.tagLabel.setValue(inputValue[inputValue.length - 1].label);
        }
        if(props.createTag.canExecute){
          props.createTag.execute();
        }
        setLabels(inputValue);
      } catch (err) {
        console.error('Failed to create a Tag: ' + err);
      }
      setIsLoading(false);
    }
    if (
      actionMeta.action === 'remove-value' ||
      actionMeta.action === 'pop-value'
    ) {
      setIsLoading(true);
      try {
        if(props.tagLabel.status==='available'){
          props.tagLabel.setValue(actionMeta.removedValue.label);
        }
        if(props.removeTag.canExecute){
          props.removeTag.execute();
        }
        setLabels(inputValue);
      } catch (err) {
        console.error('Failed to remove a Tag: ' + err);
      }
      setIsLoading(false);
    }
    if (actionMeta.action === 'clear') {
      setIsLoading(true);
      try {
        if(props.removeAllTags.canExecute){
          props.removeAllTags.execute();
        }
        setLabels(inputValue);
      } catch (err) {
        console.error('Failed to remove all Tags: ' + err);
      }
      setIsLoading(false);
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
  if(props.enableCreate){
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
  else{
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

}