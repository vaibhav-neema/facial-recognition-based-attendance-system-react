# Commit Message Structure

- **prefix1 - (`doc`/`feature`/`refactor`/`bugfix`/`design`/`test`)**

  - doc : for any changes related to documentation
  - feature : code related changes that impact functionality of the application
  - refactor : code related changes that doesn't affect the functionality
  - bugfix : code related changes for any bugfix resolved
  - design : any changes made to css/scss file
  - test : any changes related to test cases

- **prefix2 (in parenthesis) - (`component`/`page`/`readme`/`contribution`/`project`)**

  - component : for any changes related to any component
  - page : code related changes that impacts functionality of any page
  - readme : changes related to README.md file
  - contribution : changes related to CONTRIBUTION.md file
  - project : any changes affecting the whole project

- **body (in one line) - give a brief logical info about the changes done**

- structure - `prefix1(prefix2) : body`
- eg. : `doc(project) : updated README.md file and added CONTRIBUTION.md file`

# JS Files Name Structure

- fileName.js

# React Component Structure

## Component Structure

e.g. - To create `Icon` component -

- Keeps in a separate directory.
- Path - `src/components/Icon/Icon.js` & `src/components/Icon/Icon.scss`

## React - Component Structure (if required)

```js
      // All React specific imports like `react`.
      // All third party library imports like `classnames` or `prop-types`.
      <new_line>
      // All internal imports from `components`, `assets`.
      <new_line>
      // All internal imports from `styles`.
      <new_line>
      // All internal lazy load imports.
       <new_line>
      // component definition - `ComponentName` with `props`
      <new_line>
      // component specific local variables
      <new_line>
      // react hooks like useState.
      <new_line>
      // react hooks like useEffect.
      // If using any function in useEffect we may need to define it before.
      <new_line>
      // functions
      <new_line>
      // returning HTML
      <new_line>
      // component definition ends
      <new_line>
      // Component `defaultProps`
      <new_line>
      // Component `propTypes`
      <new_line>
      // export default `ComponentName`;
```

# CSS/SCSS Structure

- CSS naming conventions: eg: example-css-class
- SCSS Nesting: not more than 3 levels.
