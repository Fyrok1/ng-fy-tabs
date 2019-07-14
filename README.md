
# ng-fy-tabs

A module for tabs component with component ref without routing
[Click for demo](https://Fyrok1.github.io/ng-fy-tabs/)

## Install
`npm install ng-fy-tabs`

## Usage

`import { NgFyTabsModule } from 'ng-fy-tabs';`

add to module imports
```javascript
imports: [
  NgFyTabsModule
]
```
add to html file
```html
<ng-fy-tabs></ng-fy-tabs>
```

###  Inputs

| Name | Type |Default|Description
|--|--|--|--|
| tabs | ngFyTabsInterface[] | []|all tabs object|



### Outputs
| Name | Type | Description|
|--|--|--|
| tabChange| string| Fired when active tab change|

### ngFyTabsInterface
|Name| Type|Default|Optional|Readonly|Description|
|--|--|--|--|--|--|
|id| string or number||false|true|tab id for identification|
|title|string||false|false|tab title|
|canRefresh|boolean|false|true|false|tab refresh from zero|
|canClose|boolean|true|true|false|close tab|
|component|Component||false|true|Component ref for tab content|
|componentRef|ComponentRef|undefined|true|false|**Do not set or change** this one for me
|data|{ key:  string, value:  string }[]||true|false|component attr value
|loading|boolean|false|true|false|if loading component set true|

## Changing Some Values
if u want to change somethink change it, its gone be fine but if u gona remove one of data set undefined i'll remove it