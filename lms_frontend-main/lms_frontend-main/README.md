# LMS frontend

### Setup instruction

1. Clone the project 

```
 git clone https://github.com/avinasharex/lms_frontend.git
```

2. Move into directory

```
cd client
```

3. Install dependencies

```
npm i
```

4. Run the server 

```
npm run dev
```

### Setup instruction for tailwind

[tailwind official instruction docs]https://tailwindcss.com/docs/installation

1. Install tailwindcss

```
npm install -D tailwindcss postcss autoprefixer
```

2. Create tailwind config file

```
npx tailwindcss init
```

3. Add file extension to tailwind config file in the contents property

```
 
"./src/**/*.{html,js,jsx,ts,tsx}","./index.html"
```

4. Add the tailwind directive at the top of the `index.css` file

5. Add the following details in plugin property of tailwind config

```
[require("daisyui"), require("@tailwindcss/line-clamp")]
```

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Adding plugins and dependency

```
npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
```

### Configure auto import sort eslint

1. Install simple import sort plugin

```
npm i eslint-plugin-simple-import-sort
```

2. Add rule in `.eslint.cjs`

```
"simple-import-sort/imports": "error"
```

3. Add simple import sort plugin in `.eslint.cjs`

```
 plugins: [...,"simple-import-sort"]
```

4. To enable auto import sort on file save in vs code 

  - Open `setting.json`
  - and following config

  ```
   "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
  ```