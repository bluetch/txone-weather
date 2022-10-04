# txone-weather prototyping exercise

### Tasks

1. menu style (done with SCSS)
2. dynamically load page (done with Next.js router)
3. data analysis (done with Chart.js)
4. today's weather (done with axios and hook)

<strong>The weather icon I used dynamic import SVG instead of CSS sprite, not only for helping higher performance for few search scenario and also better resolution for visual.</strong>

---

### Built With

- [(React.js) Next.js](https://nextjs.org/)

### Additional Packages

- [@svgr/webpack](https://react-svgr.com/docs/webpack/)
- [eslint](https://eslint.org)
- [prettier](https://prettier.io/)
- [sass](https://sass-lang.com/)
- [chart.js](https://www.chartjs.org/)
- [axios](https://axios-http.com/)

## Getting Started

### Prerequisites

For Mac user, please install [Homebrew](https://brew.sh/) first.
then run the following command to install the required packages:

```
brew install yarn node eslint prettier git
```

### Installation

1. Clone the repo

```sh
git clone git@github.com:bluetch/txone-weather.git
```

2. Install NPM packages

```sh
yarn install
```

<!-- USAGE EXAMPLES -->

## Usage

### Run Development Server

```
yarn dev
```

## Project Structure Explain

### Project source code

- `components/`: Components should be named with PascalCase.
- `pages/`: All next.js pages. Include apis.
- `hooks/`: React.js Hooks. Should be named with prefix `use`.
- `styles/`: CSS files.
- `assets/`: Static files. include svg-icons, lottie-animate etc.
- `public/`: Static files. include favicon, images etc.

### VIP Config files

- `package.json`: npm/yarn commands and deps.
- `next.config.js`: Override some webpack config here.
- `.eslintrc.json`: Use by IDE, git pre-commit and `yarn lint`.

### Other Config files

- `.gitignore`: Let git ignore some files.
- `jsconfig.json`: Tell VSCode import module from root directory.
