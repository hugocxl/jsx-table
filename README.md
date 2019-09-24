<div align="center">
  <img src="media/header.png" width="100%" align="center">
</div>

<div align="center" style="padding-top:10px">

  [![NPM](https://img.shields.io/npm/v/react-awesome-table.svg)](https://www.npmjs.com/package/react-awesome-table)
  [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
  [![Build Status](https://travis-ci.com/hcorta/react-ninja-table.svg?branch=master)](https://travis-ci.com/hcorta/react-ninja-table)
  [![dependencies Status](https://david-dm.org/hcorta/react-ninja-table/status.svg)](https://david-dm.org/hcorta/react-ninja-table)
  [![devDependencies Status](https://david-dm.org/hcorta/react-ninja-table/dev-status.svg)](https://david-dm.org/hcorta/react-ninja-table?type=dev)
  [![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
  
</div>

<div align="center">
  <p>A <strong>simple</strong> but <strong>powerful</strong> lightweight (6.4kB) table for React with <strong>highly-customizable</strong> options</p>
</div>

***
## Install

```bash
yarn add react-ninja-table
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-awesome-table'

class Example extends Component {
  render () {
    return (
      <MyComponent />
    )
  }
}
```

## Tasks
- [x] Virtualization
- [x] Sorting
- [x] loading status
- [x] Pagination
- [x] Custom column sorting
- [x] Memoized columns
- [x] Pass dom event on table events
- [ ] Footer
- [ ] Fix height prop
- [x] Custom CSS classnames to elements
- [x] Optional custom id to attach to root Table element
- [x] onScroll prop
- [ ] scrollToIndex, scrollTop, scrollToAlignment
- [ ] rowCount prop - Number of rows in table
- [x] Colum - maxWidth, minWidth props
- [ ] Pagination review
- [ ] Sort review (sortable prop + sortMethod)
- [x] overscanRowCount Prop
- [ ] Filters
- [ ] Grouping
- [ ] Editing
- [ ] Freeze columns
- [ ] Row selection
- [ ] Download data
- [ ] Resizable columns
- [ ] Dnd columns/rows (react-sortable-hoc)
- [ ] Multi colum sorting
- [ ] Infinite loading





## License

MIT © [hcorta](https://github.com/hcorta)
