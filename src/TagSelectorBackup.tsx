// import { useState, createElement } from "react";

// import { TagSelectorContainerProps } from "../typings/TagSelectorProps";

// import "./ui/TagSelector.css";

// import makeAnimated from 'react-select/animated';
// import CreatableSelect from 'react-select/creatable';
// // import { Styles } from 'react-select/src/styles';

// // const createOption = (label: string) => ({
// //     label: label.toLowerCase(),
// //     value: label.toLowerCase().replace(/\W/g, ''),
// //   });

// const animatedComponents = makeAnimated();

// export interface Option {
//     label: string;
//     value: string;
//   }
  
//   export interface Label {
//     label: string;
//     value: string;
//   }

// export default function LabelSelect({
//     // getAllLabels,
//     // mxObject,
//     // mxform,
//     // labelAttrib,
//     // getLabelsOfContext,
//     // stringWrapperNPE,
//     // labelAttribWrapperNPE,
//     // EntityIDAttribWrapperNPE,
//     // clearAllLabels,
//     // contextIDAttrib,
//     // onCreateLabel,
//     // onDeleteLabel,
//     // useDefaultStyle,
//     placeholder,
//     className,
//     classNamePrefix,
//   }: TagSelectorContainerProps) {

//   const [isLoading, setIsLoading] = useState(false);
//   const [options, setOptions] = useState<Option[]>([]);
//   const [labels, setLabelss] = useState<Label[]>([]);

//     // useEffect(() => {
//     // const fetchOptions = async () => {
//     //   const obj = await mxData.create(stringWrapperNPE);
//     //   obj.set(EntityIDAttribWrapperNPE, mxObject.get(contextIDAttrib));
//     //   const objList = await mxData.action<mendix.lib.MxObject[]>({
//     //     actionname: getAllLabels,
//     //     guids: [obj.getGuid()],
//     //     origin: mxform,
//     //   });
//     //   const fetchedOptions = objList.map(obj =>
//     //     createOption(obj.get(labelAttrib) as string)
//     //   );
//     //   setOptions(fetchedOptions);
//     // };

//     // fetchOptions();
//     //}, [mxObject]);

//     // useEffect(() => {
//     // const fetchLabels = async () => {
//     //   try {
//     //     const obj = await mxData.create(stringWrapperNPE);
//     //     obj.set(EntityIDAttribWrapperNPE, mxObject.get(contextIDAttrib));
//     //     const objList = await mxData.action<mendix.lib.MxObject[]>({
//     //       applyto: 'selection',
//     //       actionname: getLabelsOfContext,
//     //       guids: [obj.getGuid()],
//     //       origin: mxform,
//     //     });
//     //     const fetchedLabels = objList.map(obj =>
//     //       createOption(obj.get(labelAttrib) as string)
//     //     );
//     //     setLabels(fetchedLabels);
//     //   } catch (err) {
//     //     console.error(err);
//     //   }
//     // };
//     // fetchLabels();
//     // }, [mxObject]);


//   const handleChange = async (inputValue: any, actionMeta: any) => {
//     // if (
//     //   actionMeta.action === 'create-option' ||
//     //   actionMeta.action === 'select-option'
//     // ) {
//     //   setIsLoading(true);
//     //   inputValue[inputValue.length - 1].label = inputValue[
//     //     inputValue.length - 1
//     //   ].label.toLowerCase();
//     //   try {
//     //     const obj = await mxData.create(stringWrapperNPE);
//     //     obj.set(labelAttribWrapperNPE, inputValue[inputValue.length - 1].label);
//     //     obj.set(EntityIDAttribWrapperNPE, mxObject.get(contextIDAttrib));
//     //     await mxData.action({
//     //       applyto: 'selection',
//     //       actionname: onCreateLabel,
//     //       guids: [obj.getGuid()],
//     //       origin: mxform,
//     //     });
//     //     setLabels(inputValue);
//     //   } catch (err) {
//     //     console.error('Failed to create a Label: ' + err);
//     //   }
//     //   setIsLoading(false);
//     // }
//     // if (
//     //   actionMeta.action === 'remove-value' ||
//     //   actionMeta.action === 'pop-value'
//     // ) {
//     //   setIsLoading(true);
//     //   try {
//     //     const obj = await mxData.create(stringWrapperNPE);
//     //     obj.set(labelAttribWrapperNPE, actionMeta.removedValue.label);
//     //     obj.set(EntityIDAttribWrapperNPE, mxObject.get(contextIDAttrib));
//     //     await mxData.action({
//     //       applyto: 'selection',
//     //       actionname: onDeleteLabel,
//     //       guids: [obj.getGuid()],
//     //       origin: mxform,
//     //     });
//     //     setLabels(inputValue);
//     //   } catch (err) {
//     //     console.error('Failed to remove a Label: ' + err);
//     //   }
//     //   setIsLoading(false);
//     // }
//     // if (actionMeta.action === 'clear') {
//     //   setIsLoading(true);
//     //   try {
//     //     const obj = await mxData.create(stringWrapperNPE);
//     //     obj.set(EntityIDAttribWrapperNPE, mxObject.get(contextIDAttrib));
//     //     await mxData.action({
//     //       applyto: 'selection',
//     //       actionname: clearAllLabels,
//     //       guids: [obj.getGuid()],
//     //       origin: mxform,
//     //     });
//     //     setLabels(inputValue);
//     //   } catch (err) {
//     //     console.error('Failed to remove all Labels: ' + err);
//     //   }
//     //   setIsLoading(false);
//     // }
//   };

// //   let styles: Styles = {};

// //   if (!useDefaultStyle) {
// //     styles = {
// //       clearIndicator: () => ({}),
// //       container: () => ({}),
// //       control: () => ({}),
// //       dropdownIndicator: () => ({}),
// //       group: () => ({}),
// //       groupHeading: () => ({}),
// //       indicatorsContainer: () => ({}),
// //       indicatorSeparator: () => ({}),
// //       input: () => ({}),
// //       loadingIndicator: () => ({}),
// //       loadingMessage: () => ({}),
// //       menu: () => ({}),
// //       menuList: () => ({}),
// //       menuPortal: () => ({}),
// //       multiValue: () => ({}),
// //       multiValueLabel: () => ({}),
// //       multiValueRemove: () => ({}),
// //       noOptionsMessage: () => ({}),
// //       option: () => ({}),
// //       placeholder: () => ({}),
// //       singleValue: () => ({}),
// //       valueContainer: () => ({}),
// //     };
// //   }

//   return (
//     <CreatableSelect
//       isMulti
//       options={options}
//       value={labels}
//       onChange={handleChange}
//       isLoading={isLoading}
//       components={animatedComponents}
//       //styles={styles}
//       placeholder={placeholder}
//       className={className!}
//       classNamePrefix={classNamePrefix}
//       tabSelectsValue={false}
//     />
//   );
// }

