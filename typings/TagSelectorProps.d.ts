/**
 * This file was generated from TagSelector.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue } from "mendix";

export interface TagSelectorContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    id: string;
    tagLabel: EditableValue<string>;
    selectTag?: ActionValue;
    createTag?: ActionValue;
    removeTag?: ActionValue;
    removeAllTags?: ActionValue;
    currentTags: ListValue;
    currentTagLabel: ListAttributeValue<string>;
    tagSuggestions: ListValue;
    tagSuggestionsLabel: ListAttributeValue<string>;
    enableCreate: boolean;
    enableComma: boolean;
    enableSpace: boolean;
    useDefaultStyle: boolean;
    placeholder: string;
    customCreatePrefix: string;
    className: string;
    classNamePrefix: string;
    animatedDelete: boolean;
}

export interface TagSelectorPreviewProps {
    class: string;
    style: string;
    tagLabel: string;
    selectTag: {} | null;
    createTag: {} | null;
    removeTag: {} | null;
    removeAllTags: {} | null;
    currentTags: {} | { type: string } | null;
    currentTagLabel: string;
    tagSuggestions: {} | { type: string } | null;
    tagSuggestionsLabel: string;
    enableCreate: boolean;
    enableComma: boolean;
    enableSpace: boolean;
    useDefaultStyle: boolean;
    placeholder: string;
    customCreatePrefix: string;
    className: string;
    classNamePrefix: string;
    animatedDelete: boolean;
}
