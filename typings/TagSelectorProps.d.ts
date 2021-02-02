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
    tabIndex: number;
    tagLabel: EditableValue<string>;
    createTag?: ActionValue;
    removeTag?: ActionValue;
    removeAllTags?: ActionValue;
    currentTags: ListValue;
    currentTagLabel: ListAttributeValue<string>;
    tagSuggestions: ListValue;
    tagSuggestionsLabel: ListAttributeValue<string>;
    useDefaultStyle: boolean;
    placeholder: string;
    className: string;
    classNamePrefix: string;
}

export interface TagSelectorPreviewProps {
    class: string;
    style: string;
    tagLabel: string;
    createTag: {} | null;
    removeTag: {} | null;
    removeAllTags: {} | null;
    currentTags: {} | null;
    currentTagLabel: string;
    tagSuggestions: {} | null;
    tagSuggestionsLabel: string;
    useDefaultStyle: boolean;
    placeholder: string;
    className: string;
    classNamePrefix: string;
}
