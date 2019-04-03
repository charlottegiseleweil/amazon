# USAGE FOR navbar.lit.js

# data.js

Edit your data, ie, links and organization in the menuData.js file

# navbar.lit.js

This is the entry file. At the end of the file there is a render function that selects an element from the dom, and renders the component to that spot, much like google maps.

# For all html files

include this in the head:

```html
<link rel="stylesheet" href="./tachyons.min.css" />
<link rel="stylesheet" href="./src/dropdown.css" />
```

and this at the end of the body:

```html
<script type="module" src="src/navbar.lit.js"></script>
```
