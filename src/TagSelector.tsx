import { Component, ReactNode, createElement, ReactElement } from "react";
import TagSelect from "./components/TagSelectorComp";

import { TagSelectorContainerProps } from "../typings/TagSelectorProps";

import "./ui/TagSelector.css";

export default function TagSelector(props: TagSelectorContainerProps): ReactElement{
        return  <TagSelect
                    placeholder={props.placeholder}
                    className={props.className}
                    classNamePrefix={props.classNamePrefix}
                    tagLabel={props.tagLabel}
                    createTag={props.createTag}
                    removeTag={props.removeTag}
                    removeAllTags={props.removeAllTags}
                    currentTags={props.currentTags}
                    currentTagLabel={props.currentTagLabel}
                    tagSuggestions={props.tagSuggestions}
                    tagSuggestionsLabel={props.tagSuggestionsLabel}
                    useDefaultStyle={props.useDefaultStyle}
                />;
}
