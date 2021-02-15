[![Known Vulnerabilities](https://snyk.io/test/github/JansenNick/TagSelector/badge.svg?targetFile=package.json)](https://snyk.io/test/github/JansenNick/TagSelector?targetFile=package.json)

## TagSelector
The Tag Selector is a pluggable widget that implements the popular react-select library for Mendix. It allows both for the creation and selection of tags (or any other object). The widget is setup so all the logic for selection/creation/deletion/retrieval can happen in Mendix.

## Features
- Selection of tags
- Creation of tags
- Animated deletion of tags
- Logic fully manageable in Mendix

## Usage
Having a look at the test project can be a great help to understand how the widget is setup.
1. The widget requires a non persistent helper object to function. This object must have one string attribute to store the label of each tag. In the test project I named this object TagNPE.
2. Before placing the widget on a page you should add a dataview containing this helper object for the widget.
3. Place the widget inside this dataview.
4. Specifiy the string attribute of the helper object in the TagNPE Label field.
5. Specify microflows that handle the selection, creation and removal of tags.
6. Specify the datasources for the retrieval of the current and optional tags. Also specify their label attributes.
7. Specify if you want to allow for the creation of tags by the widget, if set to false the Create tag microflow will be disregarded.
8. Optionally set several styling options in the styling tab.

## Test project
A test project is stored at /tests/testProject.

## Issues, suggestions and feature requests
[link to GitHub issues](https://github.com/JansenNick/TagSelector/issues)

## Development and contribution
This widget has community support level.
