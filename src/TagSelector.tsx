import { createElement, ReactElement } from "react";
import TagSelect from "./components/TagSelectorComp";

import { TagSelectorContainerProps } from "../typings/TagSelectorProps";

import "./ui/TagSelector.css";

export default function TagSelector(props: TagSelectorContainerProps): ReactElement{
        return  <TagSelect
                    placeholder={props.placeholder}
                    datasourceMicroflow={props.datasourceMicroflow}
                    guid={props.guid}
                    inputValue={props.inputValue}
                    className={props.className}
                    classNamePrefix={props.classNamePrefix}
                    tagLabel={props.tagLabel}
                    selectTag={props.selectTag}
                    createTag={props.createTag}
                    removeTag={props.removeTag}
                    removeAllTags={props.removeAllTags}
                    currentTags={props.currentTags}
                    currentTagLabel={props.currentTagLabel}
                    tagSuggestions={props.tagSuggestions}
                    tagSuggestionsLabel={props.tagSuggestionsLabel}
                    useDefaultStyle={props.useDefaultStyle}
                    enableCreate={props.enableCreate}
                    animatedDelete={props.animatedDelete}
                    disabled={props.tagLabel.readOnly}
                    customCreatePrefix={props.customCreatePrefix}
                />;
}
